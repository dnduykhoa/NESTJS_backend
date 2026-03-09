import { Model } from 'mongoose';
import { CategoryAttribute } from '../schemas/category-attribute.schema';
import { CreateCategoryAttributeDto } from '../dto/category-attributes/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/category-attributes/update-category-attribute.dto';
export declare class CategoryAttributesService {
    private categoryAttributeModel;
    constructor(categoryAttributeModel: Model<CategoryAttribute>);
    findByCategory(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, CategoryAttribute, {}, import("mongoose").DefaultSchemaOptions> & CategoryAttribute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    assign(dto: CreateCategoryAttributeDto): Promise<import("mongoose").Document<unknown, {}, CategoryAttribute, {}, import("mongoose").DefaultSchemaOptions> & CategoryAttribute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, dto: UpdateCategoryAttributeDto): Promise<import("mongoose").Document<unknown, {}, CategoryAttribute, {}, import("mongoose").DefaultSchemaOptions> & CategoryAttribute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    removeByKeys(categoryId: string, attrDefId: string): Promise<{
        message: string;
    }>;
}
