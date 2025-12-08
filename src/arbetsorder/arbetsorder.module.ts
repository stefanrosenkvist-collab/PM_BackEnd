import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArbetsorderService } from './arbetsorder.service';
import { ArbetsorderController } from './arbetsorder.controller';
import { Arbetsorder } from '../entities/arbetsorder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Arbetsorder])],
  controllers: [ArbetsorderController],
  providers: [ArbetsorderService],
  exports: [ArbetsorderService],
})
export class ArbetsorderModule {}

