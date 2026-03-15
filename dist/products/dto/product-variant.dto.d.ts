export declare class ProductVariantValueDto {
    attrDefId?: string;
    attrKey: string;
    attrValue?: string;
    valueNumber?: number;
    displayOrder?: number;
}
export declare class CreateProductVariantDto {
    sku: string;
    price: number;
    stockQuantity?: number;
    isActive?: boolean;
    displayOrder?: number;
    values?: ProductVariantValueDto[];
}
export declare class UpdateProductVariantDto {
    sku?: string;
    price?: number;
    stockQuantity?: number;
    isActive?: boolean;
    displayOrder?: number;
    values?: ProductVariantValueDto[];
}
