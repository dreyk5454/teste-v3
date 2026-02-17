import { IsString, IsNotEmpty, IsUrl, IsUUID } from 'class-validator';

export class CreateLiveDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description?: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  thumbnail?: string;

  @IsUUID()
  @IsNotEmpty()
  creatorId: string;
}
