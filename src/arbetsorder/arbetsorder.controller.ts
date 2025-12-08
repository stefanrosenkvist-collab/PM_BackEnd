import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArbetsorderService } from './arbetsorder.service';
import { CreateArbetsorderDto } from './dto/create-arbetsorder.dto';
import { UpdateArbetsorderDto } from './dto/update-arbetsorder.dto';

@Controller('arbetsorder')
export class ArbetsorderController {
  constructor(private readonly arbetsorderService: ArbetsorderService) {}

  @Post()
  create(@Body() createArbetsorderDto: CreateArbetsorderDto) {
    return this.arbetsorderService.create(createArbetsorderDto);
  }

  @Get()
  findAll(@Query('taskId') taskId?: string) {
    if (taskId) {
      return this.arbetsorderService.findByTask(taskId);
    }
    return this.arbetsorderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arbetsorderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArbetsorderDto: UpdateArbetsorderDto) {
    return this.arbetsorderService.update(id, updateArbetsorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.arbetsorderService.remove(id);
  }
}

