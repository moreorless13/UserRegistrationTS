"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const graphql_1 = require("graphql");
const auth_1 = require("../utils/auth");
const transporter_1 = require("../utils/transporter");
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../models/User"));
const ObjectIdScalar = new graphql_1.GraphQLScalarType({
    name: "ObjectId",
    description: "Mongo ObjectId scalar type",
    serialize(value) {
        if (!(value instanceof mongodb_1.ObjectId)) {
            throw new Error('ObjectIdScalar can only serialize ObjectId values');
        }
        return value.toHexString();
    },
    parseValue(value) {
        if (typeof value !== "string") {
            throw new Error('ObjectIdScalar can only parse string values');
        }
        return new mongodb_1.ObjectId(value);
    },
    parseLiteral(ast) {
        if (ast.kind !== graphql_1.Kind.STRING) {
            throw new Error("ObjectIdScalar can only parse string values");
        }
        return new mongodb_1.ObjectId(ast.value);
    }
});
const dateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value.getTime(); // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return new Date(value); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    },
});
const ServiceResolvers = {
    Date: dateScalar,
    ObjectId: ObjectIdScalar,
    Query: {
        users: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(context.user.data.role);
            if (!context.user || !(context.user.data.role === "Admin"))
                return null;
            try {
                return yield User_1.default.find();
            }
            catch (error) {
                console.error(error);
            }
        }),
        user: (parent, { userId }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ _id: userId });
                return user;
            }
            catch (error) {
                console.error(error);
            }
        }),
        me: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.user) {
                try {
                    const user = yield User_1.default.findById({ _id: context.user.data._id });
                    return user;
                }
                catch (error) {
                    console.error(error);
                }
            }
            else {
                throw new apollo_server_core_1.AuthenticationError('You are not authorized to view this account');
            }
        }),
        verifyUser: (parent, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User_1.default.findByIdAndUpdate({ _id: userId }, { $set: { accountStatus: 'Active' } }, { new: true });
            return user;
        }),
    },
    Mutation: {
        addUser: (parent, { username, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const existingUser = yield User_1.default.findOne({ username } || { email });
                if (existingUser) {
                    throw new apollo_server_core_1.AuthenticationError('User already exists');
                }
                else {
                    const newUser = yield User_1.default.create({ username, email, password });
                    console.log(newUser);
                    (0, transporter_1.sendConfirmationEmail)(username, email, newUser._id);
                    return newUser;
                }
            }
            catch (error) {
                console.error(error);
            }
        }),
        login: (parent, { username, password }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ username });
                if ((user === null || user === void 0 ? void 0 : user.accountStatus) !== 'Active') {
                    throw new apollo_server_core_1.AuthenticationError('Please check your email for account confirmation.');
                }
                if (!user) {
                    throw new apollo_server_core_1.AuthenticationError('User does not exist');
                }
                else {
                    const correctPassword = yield user.isCorrectPassword(password);
                    if (!correctPassword) {
                        throw new apollo_server_core_1.AuthenticationError('Invalid credentials');
                    }
                    const token = (0, auth_1.signToken)(user);
                    return { token, user };
                }
            }
            catch (error) {
                console.error(error);
            }
        }),
        removeUser: (parent, { username, email, password }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.user) {
                    const user = yield User_1.default.findById({ _id: context.user.data._id });
                    const correctPassword = yield (user === null || user === void 0 ? void 0 : user.isCorrectPassword(password));
                    if (!correctPassword || username !== (user === null || user === void 0 ? void 0 : user.username) || email !== (user === null || user === void 0 ? void 0 : user.email)) {
                        throw new apollo_server_core_1.AuthenticationError('Must provide correct credentials to delete account!');
                    }
                    else {
                        return yield User_1.default.findByIdAndDelete({ _id: context.user.data._id });
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }),
        updatePassword: (parent, { userId, oldPassword, newPassword, confirmationPassword }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (newPassword !== confirmationPassword) {
                    throw new apollo_server_core_1.AuthenticationError('Passwords must match!');
                }
                const user = yield User_1.default.findById({ _id: context.user.data._id });
                if (!user) {
                    throw new apollo_server_core_1.AuthenticationError('User does not exist');
                }
                const correctPassword = user.isCorrectPassword(oldPassword);
                if (!correctPassword) {
                    throw new apollo_server_core_1.AuthenticationError('You must enter correct password!');
                }
                else {
                    user.password = newPassword;
                    yield user.save({ timestamps: true });
                    return user;
                }
            }
            catch (error) {
                console.error(error);
            }
        }),
        forgotPassword: (parent, { email }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email });
                if (!user) {
                    throw new apollo_server_core_1.AuthenticationError('User with that email does not exist');
                }
                (0, transporter_1.sendForgotPasswordEmail)(email, user._id);
            }
            catch (error) {
                console.error(error);
            }
        }),
        changeUserAccountStatus: (parent, { userId, accountStatus }, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.user) {
                    const user = yield User_1.default.findById({ _id: context.user.data._id });
                    if ((user === null || user === void 0 ? void 0 : user.role) !== 'Admin') {
                        throw new apollo_server_core_1.AuthenticationError('You are not authorized to change account status');
                    }
                    const updatedUser = yield User_1.default.findByIdAndUpdate({ _id: userId }, { $set: { accountStatus } }, { new: true });
                    return updatedUser;
                }
            }
            catch (error) {
                console.error(error);
            }
        })
    }
};
exports.default = ServiceResolvers;
