import { IsString, IsEmail, IsIn } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsIn(['admin', 'manager', 'developer', 'designer', 'other'])
  role: string;

  @IsString()
  @IsIn(['active', 'inactive'])
  status: string;
}
