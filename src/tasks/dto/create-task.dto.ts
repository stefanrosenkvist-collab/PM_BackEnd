import { IsString, IsOptional, IsDateString, IsIn, IsArray } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  projectId: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['todo', 'in-progress', 'review', 'done'])
  status: string;

  @IsString()
  @IsIn(['low', 'medium', 'high'], {
    message: 'priority must be one of the following values: low, medium, high'
  })
  priority: string;

  @IsString()
  @IsOptional()
  assigneeId?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
