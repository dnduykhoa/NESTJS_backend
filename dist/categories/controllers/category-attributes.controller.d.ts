import { Response } from 'express';
import { CategoryAttributesService } from '../services/category-attributes.service';
import { CreateCategoryAttributeDto } from '../dto/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/update-category-attribute.dto';
export declare class CategoryAttributesController {
    private readonly categoryAttributesService;
    constructor(categoryAttributesService: CategoryAttributesService);
    getByCategory(categoryId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    assign(body: CreateCategoryAttributeDto, qCategoryId: string, qAttrDefId: string, qIsRequired: string, qDisplayOrder: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateAssignment(id: string, body: UpdateCategoryAttributeDto, qIsRequired: string, qDisplayOrder: string, res: Response): Promise<Response<any, Record<string, any>>>;
    removeByCategoryAndDef(categoryId: string, attrDefId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    removeById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
