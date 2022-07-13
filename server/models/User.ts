import { Schema, model, Types, Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { MongoCursorInUseError } from 'mongodb';

interface IUser {
    username: string;
    email: string;
    password: string;
    accountStatus: string;
    role: string;
    createdAt: Date;
    avatar?: string;
}

interface UserMethods {
    isCorrectPassword(password: string): any;
}

type UserModel = Model<IUser, {}, UserMethods>

const schema = new Schema<IUser, UserModel, UserMethods>({
    username: { type: String, required: true, unique: true, trim: true, minlength: 5 },
    email: { type: String, required: true, unique: true, match: [/.+@.+\..+/, 'Must match an email address'] },
    password: { type: String, required: true, minlength: 5 },
    accountStatus: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    role: { type: String, required: true, enum: ['Admin', 'Moderator', 'User'], default: 'User' }, 
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

schema.pre('save', async function (next: any) {
    if(this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next()
})

schema.method('isCorrectPassword', async function isCorrectPassword(password){
    return await bcrypt.compare(password, this.password)
})

const User = model<IUser, UserModel>('User', schema);
export default User;

