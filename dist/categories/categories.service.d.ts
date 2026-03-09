import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';
export declare class CategoriesService {
    private categoryModel;
    private productModel;
    constructor(categoryModel: Model<Category>, productModel: Model<any>);
    create(createCategoryDto: CreateCategoryDto): Promise<import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findRoot(): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findChildren(id: string): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findActive(): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    search(name: string): Promise<(import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        category: import("mongoose").Document<unknown, {}, Category, {}, import("mongoose").DefaultSchemaOptions> & Category & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
