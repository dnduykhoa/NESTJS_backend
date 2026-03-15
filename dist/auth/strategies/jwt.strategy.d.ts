import { Strategy } from 'passport-jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    validate(payload: {
        id: string;
    }): Promise<import("mongoose").Document<unknown, {}, UserDocument, {}, {}> & User & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
export {};
