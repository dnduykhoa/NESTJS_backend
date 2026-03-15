import { IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarouselSlideDto {
  @IsOptional()
  image?: string;

  @IsOptional()
  mediaType?: string; // IMAGE | VIDEO

  @IsOptional()
  badge?: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  subtitle?: string;

  @IsOptional()
  buttonText?: string;

  @IsOptional()
  buttonLink?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  displayOrder?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  intervalMs?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCarouselSlideDto extends CreateCarouselSlideDto {}
