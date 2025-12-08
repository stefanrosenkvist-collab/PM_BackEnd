"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const team_member_entity_1 = require("../entities/team-member.entity");
const uuid_1 = require("uuid");
let TeamService = class TeamService {
    constructor(teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
    }
    async create(createTeamDto) {
        // Check if email already exists
        const existing = await this.teamMemberRepository.findOne({
            where: { email: createTeamDto.email },
        });
        if (existing) {
            throw new common_1.ConflictException(`Team member with email ${createTeamDto.email} already exists`);
        }
        const member = this.teamMemberRepository.create(Object.assign({ id: (0, uuid_1.v4)() }, createTeamDto));
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
    async findOne(id) {
        const member = await this.teamMemberRepository.findOne({
            where: { id },
            relations: ['tasks'],
        });
        if (!member) {
            throw new common_1.NotFoundException(`Team member with ID ${id} not found`);
        }
        return member;
    }
    async update(id, updateTeamDto) {
        const member = await this.teamMemberRepository.findOne({ where: { id } });
        if (!member) {
            throw new common_1.NotFoundException(`Team member with ID ${id} not found`);
        }
        // If email is being updated, check for conflicts
        if (updateTeamDto.email && updateTeamDto.email !== member.email) {
            const existing = await this.teamMemberRepository.findOne({
                where: { email: updateTeamDto.email },
            });
            if (existing) {
                throw new common_1.ConflictException(`Team member with email ${updateTeamDto.email} already exists`);
            }
        }
        Object.assign(member, updateTeamDto);
        await this.teamMemberRepository.save(member);
        return this.teamMemberRepository.findOne({
            where: { id },
            relations: ['tasks'],
        });
    }
    async remove(id) {
        const member = await this.teamMemberRepository.findOne({ where: { id } });
        if (!member) {
            throw new common_1.NotFoundException(`Team member with ID ${id} not found`);
        }
        await this.teamMemberRepository.remove(member);
        return member;
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(team_member_entity_1.TeamMember)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeamService);
//# sourceMappingURL=team.service.js.map