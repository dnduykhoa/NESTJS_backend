import { ProductStatus } from '../schemas/product.schema';
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    stockQuantity?: number;
    categoryId?: string;
    brandId?: string;
    status?: ProductStatus;
    deleteMediaIds?: string[];
}
