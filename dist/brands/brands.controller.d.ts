import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandsController {
    private readonly brandsService;
    constructor(brandsService: BrandsService);
    create(createBrandDto: CreateBrandDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/brand.schema").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/brand.schema").Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/brand.schema").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/brand.schema").Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findActive(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/brand.schema").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/brand.schema").Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    search(name: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/brand.schema").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/brand.schema").Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/brand.schema").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/brand.schema").Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, updateBrandDto: UpdateBrandDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/brand.schema").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/brand.schema").Brand & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        brand: import("mongoose").Document<unknown, {}, import("./schemas/brand.schema").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/brand.schema").Brand & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
}
