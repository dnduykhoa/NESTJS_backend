import { Response } from 'express';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findRoot(res: Response): Promise<Response<any, Record<string, any>>>;
    findActive(res: Response): Promise<Response<any, Record<string, any>>>;
    search(name: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findChildren(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    create(dto: CreateCategoryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, dto: UpdateCategoryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
