import { ApolloError } from "apollo-server-express";
import { AuthenticationError } from "apollo-server-core";
import { GraphQLScalarType, Kind } from "graphql";
import { signToken } from "../utils/auth";
import { sendConfirmationEmail, sendForgotPasswordEmail } from "../utils/transporter";
import { ObjectId } from 'mongodb'
import User from "../models/User";

const ObjectIdScalar = new GraphQLScalarType({
    name: "ObjectId",
    description: "Mongo ObjectId scalar type",
    serialize(value: unknown): string {
        if(!(value instanceof ObjectId)) {
            throw new Error('ObjectIdScalar can only serialize ObjectId values')
        }
        return value.toHexString();
    },
    parseValue(value: unknown): ObjectId {
        if (typeof value !== "string") {
            throw new Error('ObjectIdScalar can only parse string values');
        }
        return new ObjectId(value)
    },
    parseLiteral(ast): ObjectId {
        if (ast.kind !== Kind.STRING) {
            throw new Error("ObjectIdScalar can only parse string values")
        }
        return new ObjectId(ast.value)
    }
});

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: any) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value: any) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const ServiceResolvers = {
    Date: dateScalar,
    ObjectId: ObjectIdScalar,
    Query: {
        users: async (parent: unknown, args: any, context: any) => {
            console.log(context.user.data.role)
            if (!context.user || !(context.user.data.role === "Admin")) return null;
            try {
                return await User.find()
            } catch (error) {
                console.error(error)
            }
        },
        user: async (parent: unknown, { userId }: any, context: any) => {
            try {
                const user = await User.findOne({ _id: userId })
                return user
            } catch (error) {
                console.error(error)
            }
        },  
        me: async (parent: unknown, args: any, context: any) => {
            if (context.user) {
                try {
                    const user = await User.findById({ _id: context.user.data._id });
                    return user
                } catch (error) {
                    console.error(error)
                }
            } else {
                throw new AuthenticationError('You are not authorized to view this account');
            }
        },
        verifyUser: async (parent: unknown, { userId }: any) => {
            const user = await User.findByIdAndUpdate({ _id: userId }, { $set: { accountStatus: 'Active' } }, { new: true });
            return user;
        },
    }, 
    Mutation: {
        addUser: async (parent: unknown, { username, email, password }: any) => {
            try {
                const existingUser = await User.findOne({ username } || { email });
                if (existingUser) {
                    throw new AuthenticationError('User already exists')
                } else {
                    const newUser = await User.create({ username, email, password });
                    console.log(newUser)
                    sendConfirmationEmail(username, email, newUser._id);
                    return newUser
                }
            } catch (error) {
                console.error(error);
            }
        },
        login: async (parent: unknown, { username, password }: any) => {
            try {
                const user = await User.findOne({ username });
                if (user?.accountStatus !== 'Active') {
                    throw new AuthenticationError('Please check your email for account confirmation.')
                }
                if (!user) {
                    throw new AuthenticationError('User does not exist')
                } else {
                    const correctPassword = await user.isCorrectPassword(password);
                    if(!correctPassword){
                        throw new AuthenticationError('Invalid credentials')
                    }
                    const token = signToken(user)
                    return { token, user }
                }
            } catch (error) {
                console.error(error)
            }
        },
        removeUser: async (parent: unknown, { username, email, password }: any, context: any) => {
            try {
                if (context.user) {
                    const user = await User.findById({ _id: context.user.data._id });
                    const correctPassword = await user?.isCorrectPassword(password);
                    if (!correctPassword || username !== user?.username || email !== user?.email) {
                        throw new AuthenticationError('Must provide correct credentials to delete account!')
                    } else {
                        return await User.findByIdAndDelete({ _id: context.user.data._id })
                    }
                }
            } catch (error) {
                console.error(error)
            }
        },
        updatePassword: async (parent: unknown, { userId, oldPassword, newPassword, confirmationPassword }: any, context: any) => {
            try {
               if (newPassword !== confirmationPassword) {
                    throw new AuthenticationError('Passwords must match!')
                }
                const user = await User.findById({ _id: context.user.data._id });
                if (!user) {
                    throw new AuthenticationError('User does not exist')
                } 
                const correctPassword = user.isCorrectPassword(oldPassword)
                if (!correctPassword) {
                    throw new AuthenticationError('You must enter correct password!')
                } else {
                    user.password = newPassword;
                    await user.save({ timestamps: true });
                    return user
                }
            } catch (error) {
                console.error(error)
            }
        },
        forgotPassword: async (parent: unknown, { email }: any) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new AuthenticationError('User with that email does not exist')
                }
                sendForgotPasswordEmail(email, user._id)
            } catch (error) {
                console.error(error)  
            }
        },
        changeUserAccountStatus: async (parent: unknown, { userId, accountStatus }: any, context: any) => {
            try {
                if (context.user) {
                    const user = await User.findById({ _id: context.user.data._id });
                    if (user?.role !== 'Admin') {
                        throw new AuthenticationError('You are not authorized to change account status')
                    }
                    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { $set: { accountStatus } }, { new: true });
                    return updatedUser
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}

export default ServiceResolvers;