import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class CreateArbetsorderDto {
  @IsString()
  @IsOptional()
  taskId?: string;

  @IsString()
  @IsOptional()
  projectId?: string;

  // Header fields
  @IsString()
  @IsOptional()
  workplace?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  postalCode?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  ourOrderNumber?: string;

  @IsString()
  @IsOptional()
  customerOrderNumber?: string;

  @IsString()
  @IsOptional()
  contactPerson?: string;

  @IsString()
  @IsOptional()
  contactPersonPhone?: string;

  @IsString()
  @IsOptional()
  contactPersonEmail?: string;

  @IsString()
  @IsOptional()
  workType?: string;

  // Work start checkboxes
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  workStartCheckboxes?: string[];

  // Work completion checkboxes
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  workCompletionCheckboxes?: string[];

  // Material usage
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  materialUsageCheckboxes?: string[];

  @IsString()
  @IsOptional()
  materialSpecification?: string;

  // Risk assessment
  @IsBoolean()
  @IsOptional()
  noSeriousRisksIdentified?: boolean;

  @IsBoolean()
  @IsOptional()
  risksIdentified?: boolean;

  @IsString()
  @IsOptional()
  riskContactNote?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  riskCategories?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  controlledItems?: string[];

  @IsString()
  @IsOptional()
  riskDescription?: string;

  @IsString()
  @IsOptional()
  riskActionInstruction?: string;
}

