import { IsOptional, IsObject } from 'class-validator';

export class VariantResolveDto {
  @IsOptional()
  @IsObject()
  selections: Record<string, string>; // { "color": "Đen", "storage": "256GB" }
}
