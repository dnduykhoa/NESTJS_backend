import { IsNotEmpty } from 'class-validator';

export class Toggle2faDto {
  @IsNotEmpty({ message: 'Trạng thái 2FA không được để trống' })
  enabled: boolean;
}
