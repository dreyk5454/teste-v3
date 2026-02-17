import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  creatorId: string;
}
