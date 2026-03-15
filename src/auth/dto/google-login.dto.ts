import { IsNotEmpty } from 'class-validator';

export class GoogleLoginDto {
  @IsNotEmpty({ message: 'ID Token không được để trống' })
  idToken: string;
}
