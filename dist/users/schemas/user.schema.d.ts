import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    username: string;
    password: string;
    email: string;
    fullName: string;
    phone: string;
    birthDate: Date;
    avatarUrl: string;
    provider: string;
    providerId: string;
    role: Types.ObjectId;
    twoFactorEnabled: boolean;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    isDeleted: boolean;
    loginCount: number;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User, any, {}> & User & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
