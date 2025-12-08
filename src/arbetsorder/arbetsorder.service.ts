import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arbetsorder } from '../entities/arbetsorder.entity';
import { CreateArbetsorderDto } from './dto/create-arbetsorder.dto';
import { UpdateArbetsorderDto } from './dto/update-arbetsorder.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArbetsorderService {
  constructor(
    @InjectRepository(Arbetsorder)
    private readonly arbetsorderRepository: Repository<Arbetsorder>,
  ) {}

  async create(createArbetsorderDto: CreateArbetsorderDto) {
    const arbetsorder = this.arbetsorderRepository.create({
      id: uuidv4(),
      ...createArbetsorderDto,
      workStartCheckboxes: createArbetsorderDto.workStartCheckboxes ?? [],
      workCompletionCheckboxes: createArbetsorderDto.workCompletionCheckboxes ?? [],
      materialUsageCheckboxes: createArbetsorderDto.materialUsageCheckboxes ?? [],
      riskCategories: createArbetsorderDto.riskCategories ?? [],
      controlledItems: createArbetsorderDto.controlledItems ?? [],
      noSeriousRisksIdentified: createArbetsorderDto.noSeriousRisksIdentified ?? false,
      risksIdentified: createArbetsorderDto.risksIdentified ?? false,
    });
    const saved = await this.arbetsorderRepository.save(arbetsorder);
    return this.arbetsorderRepository.findOne({
      where: { id: saved.id },
      relations: ['task'],
    });
  }

  async findAll() {
    return this.arbetsorderRepository.find({
      relations: ['task'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTask(taskId: string) {
    return this.arbetsorderRepository.find({
      where: { taskId },
      relations: ['task'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const arbetsorder = await this.arbetsorderRepository.findOne({
      where: { id },
      relations: ['task'],
    });
    if (!arbetsorder) {
      throw new NotFoundException(`Arbetsorder with ID ${id} not found`);
    }
    return arbetsorder;
  }

  async update(id: string, updateArbetsorderDto: UpdateArbetsorderDto) {
    const arbetsorder = await this.arbetsorderRepository.findOne({ where: { id } });
    if (!arbetsorder) {
      throw new NotFoundException(`Arbetsorder with ID ${id} not found`);
    }

    Object.assign(arbetsorder, updateArbetsorderDto);
    await this.arbetsorderRepository.save(arbetsorder);
    return this.arbetsorderRepository.findOne({
      where: { id },
      relations: ['task'],
    });
  }

  async remove(id: string) {
    const arbetsorder = await this.arbetsorderRepository.findOne({ where: { id } });
    if (!arbetsorder) {
      throw new NotFoundException(`Arbetsorder with ID ${id} not found`);
    }
    await this.arbetsorderRepository.remove(arbetsorder);
    return arbetsorder;
  }
}

