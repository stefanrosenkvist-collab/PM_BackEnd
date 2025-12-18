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
exports.ArbetsorderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const arbetsorder_entity_1 = require("../entities/arbetsorder.entity");
const uuid_1 = require("uuid");
let ArbetsorderService = class ArbetsorderService {
    constructor(arbetsorderRepository) {
        this.arbetsorderRepository = arbetsorderRepository;
    }
    async create(createArbetsorderDto) {
        var _a, _b, _c, _d, _e, _f, _g;
        const arbetsorder = this.arbetsorderRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createArbetsorderDto), { workStartCheckboxes: (_a = createArbetsorderDto.workStartCheckboxes) !== null && _a !== void 0 ? _a : [], workCompletionCheckboxes: (_b = createArbetsorderDto.workCompletionCheckboxes) !== null && _b !== void 0 ? _b : [], materialUsageCheckboxes: (_c = createArbetsorderDto.materialUsageCheckboxes) !== null && _c !== void 0 ? _c : [], riskCategories: (_d = createArbetsorderDto.riskCategories) !== null && _d !== void 0 ? _d : [], controlledItems: (_e = createArbetsorderDto.controlledItems) !== null && _e !== void 0 ? _e : [], noSeriousRisksIdentified: (_f = createArbetsorderDto.noSeriousRisksIdentified) !== null && _f !== void 0 ? _f : false, risksIdentified: (_g = createArbetsorderDto.risksIdentified) !== null && _g !== void 0 ? _g : false }));
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
    async findByTask(taskId) {
        return this.arbetsorderRepository.find({
            where: { taskId },
            relations: ['task'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const arbetsorder = await this.arbetsorderRepository.findOne({
            where: { id },
            relations: ['task'],
        });
        if (!arbetsorder) {
            throw new common_1.NotFoundException(`Arbetsorder with ID ${id} not found`);
        }
        return arbetsorder;
    }
    async update(id, updateArbetsorderDto) {
        const arbetsorder = await this.arbetsorderRepository.findOne({ where: { id } });
        if (!arbetsorder) {
            throw new common_1.NotFoundException(`Arbetsorder with ID ${id} not found`);
        }
        Object.assign(arbetsorder, updateArbetsorderDto);
        await this.arbetsorderRepository.save(arbetsorder);
        return this.arbetsorderRepository.findOne({
            where: { id },
            relations: ['task'],
        });
    }
    async remove(id) {
        const arbetsorder = await this.arbetsorderRepository.findOne({ where: { id } });
        if (!arbetsorder) {
            throw new common_1.NotFoundException(`Arbetsorder with ID ${id} not found`);
        }
        await this.arbetsorderRepository.remove(arbetsorder);
        return arbetsorder;
    }
};
exports.ArbetsorderService = ArbetsorderService;
exports.ArbetsorderService = ArbetsorderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(arbetsorder_entity_1.Arbetsorder)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArbetsorderService);
//# sourceMappingURL=arbetsorder.service.js.map