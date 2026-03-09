import { CategoryAttributesService } from '../services/category-attributes.service';
import { CreateCategoryAttributeDto } from '../dto/category-attributes/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/category-attributes/update-category-attribute.dto';
export declare class CategoryAttributesController {
    private readonly categoryAttributesService;
    constructor(categoryAttributesService: CategoryAttributesService);
    assign(dto: CreateCategoryAttributeDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/category-attribute.schema").CategoryAttribute, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/category-attribute.schema").CategoryAttribute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByCategory(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/category-attribute.schema").CategoryAttribute, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/category-attribute.schema").CategoryAttribute & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    update(id: string, dto: UpdateCategoryAttributeDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/category-attribute.schema").CategoryAttribute, {}, import("mongoose").DefaultSchemaOptions> & import("../schemas/category-attribute.schema").CategoryAttribute & Required<{
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
