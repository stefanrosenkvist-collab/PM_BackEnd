import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const { startDate, endDate, progress, ...rest } = createProjectDto;
    const project = this.projectRepository.create({
      id: uuidv4(),
      ...rest,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      progress: progress ?? 0,
    });
    const saved = await this.projectRepository.save(project);
    return this.projectRepository.findOne({
      where: { id: saved.id },
      relations: ['tasks'],
    });
  }

  async findAll() {
    try {
      return await this.projectRepository.find({
        relations: ['tasks'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    const { startDate, endDate, ...rest } = updateProjectDto;
    if (startDate) project.startDate = new Date(startDate);
    if (endDate !== undefined) project.endDate = endDate ? new Date(endDate) : null;
    Object.assign(project, rest);

    await this.projectRepository.save(project);
    return this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async remove(id: string) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    await this.projectRepository.remove(project);
    return project;
  }
}
