export declare class CreateCarouselSlideDto {
    image?: string;
    mediaType?: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    displayOrder?: number;
    intervalMs?: number;
    isActive?: boolean;
}
export declare class UpdateCarouselSlideDto extends CreateCarouselSlideDto {
}
