import { ProductStatus } from '../schemas/product.schema';
export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    stockQuantity: number;
    categoryId?: string;
    brandId?: string;
    status?: ProductStatus;
}
