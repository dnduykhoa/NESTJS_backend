import { Model } from 'mongoose';
import { CategoryAttributeDocument } from '../schemas/category-attribute.schema';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';
export declare class CategoryAttributesService {
    private readonly categoryAttributeModel;
    constructor(categoryAttributeModel: Model<CategoryAttributeDocument>);
    getByCategory(categoryId: string): Promise<CategoryAttributeDocument[]>;
    assign(dto: CreateCategoryAttributeDto): Promise<CategoryAttributeDocument>;
    updateAssignment(id: string, dto: UpdateCategoryAttributeDto): Promise<CategoryAttributeDocument>;
    removeById(id: string): Promise<void>;
    removeByCategoryAndDef(categoryId: string, attrDefId: string): Promise<void>;
}
