import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Arbetsorder } from '../entities/arbetsorder.entity';
import { CreateArbetsorderDto } from './dto/create-arbetsorder.dto';
import { UpdateArbetsorderDto } from './dto/update-arbetsorder.dto';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

interface RequestCacheEntry {
  timestamp: number;
  result: Promise<Arbetsorder>;
}

@Injectable()
export class ArbetsorderService {
  // Cache for deduplicating requests (key: requestHash, value: cache entry)
  private readonly requestCache = new Map<string, RequestCacheEntry>();
  private readonly DEDUPLICATION_WINDOW_MS = 2000; // 2 seconds

  constructor(
    @InjectRepository(Arbetsorder)
    private readonly arbetsorderRepository: Repository<Arbetsorder>,
  ) {
    // Clean up old cache entries every 5 seconds
    setInterval(() => this.cleanupCache(), 5000);
  }

  private generateRequestHash(id: string, dto: UpdateArbetsorderDto): string {
    const content = JSON.stringify({ id, ...dto });
    return crypto.createHash('md5').update(content).digest('hex');
  }

  private cleanupCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.requestCache.entries()) {
      if (now - entry.timestamp > this.DEDUPLICATION_WINDOW_MS) {
        this.requestCache.delete(key);
      }
    }
  }

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
    const requestHash = this.generateRequestHash(id, updateArbetsorderDto);
    const now = Date.now();

    // Check if we have a recent identical request
    const cachedEntry = this.requestCache.get(requestHash);
    if (cachedEntry && (now - cachedEntry.timestamp) < this.DEDUPLICATION_WINDOW_MS) {
      console.log(`[ArbetsorderService] Duplicate request detected for arbetsorder ${id}, returning cached result`);
      return cachedEntry.result;
    }

    // Create the update promise
    const updatePromise = (async () => {
      console.log(`[ArbetsorderService] Processing update for arbetsorder ${id}`);
      const arbetsorder = await this.arbetsorderRepository.findOne({ where: { id } });
      if (!arbetsorder) {
        throw new NotFoundException(`Arbetsorder with ID ${id} not found`);
      }

      Object.assign(arbetsorder, updateArbetsorderDto);
      await this.arbetsorderRepository.save(arbetsorder);
      const result = await this.arbetsorderRepository.findOne({
        where: { id },
        relations: ['task'],
      });
      console.log(`[ArbetsorderService] Successfully updated arbetsorder ${id}`);
      return result;
    })();

    // Cache the promise
    this.requestCache.set(requestHash, {
      timestamp: now,
      result: updatePromise,
    });

    // Clean up cache entry after completion (with a delay to allow for duplicates)
    updatePromise.finally(() => {
      setTimeout(() => {
        this.requestCache.delete(requestHash);
      }, this.DEDUPLICATION_WINDOW_MS);
    });

    return updatePromise;
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

