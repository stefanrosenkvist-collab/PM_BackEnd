import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';
import { CreateArbetsorderDto } from './create-arbetsorder.dto';

export class UpdateArbetsorderDto extends PartialType(CreateArbetsorderDto) {

   @IsString()
   @IsOptional()
   projectId?: string;
}
