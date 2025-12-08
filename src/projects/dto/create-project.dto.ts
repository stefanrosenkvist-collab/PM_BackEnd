import { IsString, IsOptional, IsInt, IsDateString, IsIn, Min, Max } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['active', 'completed', 'on-hold'])
  status: string;

  @IsString()
  @IsIn(['low', 'medium', 'high'])
  priority: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  progress?: number;
}
