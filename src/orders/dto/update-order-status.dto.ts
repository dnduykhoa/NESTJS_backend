import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  status: string; // CONFIRMED | SHIPPING | DELIVERED | CANCELLED

  @IsOptional()
  cancelReason?: string;
}
