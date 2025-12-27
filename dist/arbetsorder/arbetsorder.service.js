"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const crypto = __importStar(require("crypto"));
let ArbetsorderService = class ArbetsorderService {
    constructor(arbetsorderRepository) {
        this.arbetsorderRepository = arbetsorderRepository;
        // Cache for deduplicating requests (key: requestHash, value: cache entry)
        this.requestCache = new Map();
        this.DEDUPLICATION_WINDOW_MS = 2000; // 2 seconds
        // Clean up old cache entries every 5 seconds
        setInterval(() => this.cleanupCache(), 5000);
    }
    generateRequestHash(id, dto) {
        const content = JSON.stringify(Object.assign({ id }, dto));
        return crypto.createHash('md5').update(content).digest('hex');
    }
    cleanupCache() {
        const now = Date.now();
        for (const [key, entry] of this.requestCache.entries()) {
            if (now - entry.timestamp > this.DEDUPLICATION_WINDOW_MS) {
                this.requestCache.delete(key);
            }
        }
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
                throw new common_1.NotFoundException(`Arbetsorder with ID ${id} not found`);
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