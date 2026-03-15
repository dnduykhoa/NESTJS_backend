import { Document } from 'mongoose';
export type CarouselSlideDocument = CarouselSlide & Document;
export declare class CarouselSlide {
    image: string;
    mediaType: string;
    badge: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
    displayOrder: number;
    intervalMs: number;
    isActive: boolean;
}
export declare const CarouselSlideSchema: import("mongoose").Schema<CarouselSlide, import("mongoose").Model<CarouselSlide, any, any, any, Document<unknown, any, CarouselSlide, any, {}> & CarouselSlide & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CarouselSlide, Document<unknown, {}, import("mongoose").FlatRecord<CarouselSlide>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<CarouselSlide> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
