import { Document } from 'mongoose';
export type TwoFactorCodeDocument = TwoFactorCode & Document;
export declare class TwoFactorCode {
    emailOrPhone: string;
    code: string;
    expiryDate: Date;
    used: boolean;
}
export declare const TwoFactorCodeSchema: import("mongoose").Schema<TwoFactorCode, import("mongoose").Model<TwoFactorCode, any, any, any, Document<unknown, any, TwoFactorCode, any, {}> & TwoFactorCode & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TwoFactorCode, Document<unknown, {}, import("mongoose").FlatRecord<TwoFactorCode>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<TwoFactorCode> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
