import { Model } from 'mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './schemas/brand.schema';
export declare class BrandsService {
    private brandModel;
    private productModel;
    constructor(brandModel: Model<Brand>, productModel: Model<any>);
    create(createBrandDto: CreateBrandDto): Promise<import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findActive(): Promise<(import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    search(name: string): Promise<(import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        brand: import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
