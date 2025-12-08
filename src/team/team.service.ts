import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from '../entities/team-member.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    // Check if email already exists
    const existing = await this.teamMemberRepository.findOne({
      where: { email: createTeamDto.email },
    });
    if (existing) {
      throw new ConflictException(`Team member with email ${createTeamDto.email} already exists`);
    }

    const member = this.teamMemberRepository.create({
      id: uuidv4(),
      ...createTeamDto,
    });
    const saved = await this.teamMemberRepository.save(member);
    return this.teamMemberRepository.findOne({
      where: { id: saved.id },
      relations: ['tasks'],
    });
  }

  async findAll() {
    return this.teamMemberRepository.find({
      relations: ['tasks'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const member = await this.teamMemberRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!member) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }
    return member;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const member = await this.teamMemberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    // If email is being updated, check for conflicts
    if (updateTeamDto.email && updateTeamDto.email !== member.email) {
      const existing = await this.teamMemberRepository.findOne({
        where: { email: updateTeamDto.email },
      });
      if (existing) {
        throw new ConflictException(`Team member with email ${updateTeamDto.email} already exists`);
      }
    }

    Object.assign(member, updateTeamDto);
    await this.teamMemberRepository.save(member);
    return this.teamMemberRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
  }

  async remove(id: string) {
    const member = await this.teamMemberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }
    await this.teamMemberRepository.remove(member);
    return member;
  }
}
