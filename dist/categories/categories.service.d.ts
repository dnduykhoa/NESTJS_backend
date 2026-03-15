import { Model } from 'mongoose';
import { CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly categoryModel;
    private readonly productModel;
    constructor(categoryModel: Model<CategoryDocument>, productModel: Model<any>);
    findAll(): Promise<CategoryDocument[]>;
    findRoot(): Promise<CategoryDocument[]>;
    findChildren(id: string): Promise<CategoryDocument[]>;
    findActive(): Promise<CategoryDocument[]>;
    search(name: string): Promise<CategoryDocument[]>;
    findById(id: string): Promise<CategoryDocument>;
    create(dto: CreateCategoryDto): Promise<CategoryDocument>;
    update(id: string, dto: UpdateCategoryDto): Promise<CategoryDocument>;
    remove(id: string): Promise<void>;
}
