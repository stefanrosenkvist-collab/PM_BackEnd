import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ArbetsorderService } from '../arbetsorder/arbetsorder.service';
import { CreateArbetsorderDto } from '../arbetsorder/dto/create-arbetsorder.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly arbetsorderService: ArbetsorderService,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('projectId') projectId?: string) {
    if (projectId) {
      return this.tasksService.findByProject(projectId);
    }
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  @Post(':id/arbetsorder')
  createArbetsorder(
    @Param('id') taskId: string,
    @Body() createArbetsorderDto: CreateArbetsorderDto,
  ) {
    // Ensure the taskId from the URL is used
    return this.arbetsorderService.create({
      ...createArbetsorderDto,
      taskId,
    });
  }
}
