import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { dueDate, tags, ...rest } = createTaskDto;
    const task = this.taskRepository.create({
      id: uuidv4(),
      ...rest,
      dueDate: dueDate ? new Date(dueDate) : null,
      tags: tags ?? [],
    });
    const saved = await this.taskRepository.save(task);
    return this.taskRepository.findOne({
      where: { id: saved.id },
      relations: ['project', 'assignee'],
    });
  }

  async findAll() {
    return this.taskRepository.find({
      relations: ['project', 'assignee'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByProject(projectId: string) {
    return this.taskRepository.find({
      where: { projectId },
      relations: ['project', 'assignee'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'assignee'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    const { dueDate, tags, ...rest } = updateTaskDto;
    if (dueDate !== undefined) task.dueDate = dueDate ? new Date(dueDate) : null;
    if (tags !== undefined) task.tags = tags;
    Object.assign(task, rest);

    await this.taskRepository.save(task);
    return this.taskRepository.findOne({
      where: { id },
      relations: ['project', 'assignee'],
    });
  }

  async remove(id: string) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    await this.taskRepository.remove(task);
    return task;
  }
}
