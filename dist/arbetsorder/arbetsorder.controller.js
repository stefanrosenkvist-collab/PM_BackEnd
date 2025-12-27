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
exports.ArbetsorderController = void 0;
const common_1 = require("@nestjs/common");
const arbetsorder_service_1 = require("./arbetsorder.service");
const create_arbetsorder_dto_1 = require("./dto/create-arbetsorder.dto");
const update_arbetsorder_dto_1 = require("./dto/update-arbetsorder.dto");
let ArbetsorderController = class ArbetsorderController {
    constructor(arbetsorderService) {
        this.arbetsorderService = arbetsorderService;
    }
    create(createArbetsorderDto) {
        return this.arbetsorderService.create(createArbetsorderDto);
    }
    findAll(taskId) {
        if (taskId) {
            return this.arbetsorderService.findByTask(taskId);
        }
        return this.arbetsorderService.findAll();
    }
    findOne(id) {
        return this.arbetsorderService.findOne(id);
    }
    update(id, updateArbetsorderDto) {
        console.log(`[ArbetsorderController] PATCH request received for arbetsorder ${id}`);
        return this.arbetsorderService.update(id, updateArbetsorderDto);
    }
    remove(id) {
        return this.arbetsorderService.remove(id);
    }
};
exports.ArbetsorderController = ArbetsorderController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_arbetsorder_dto_1.CreateArbetsorderDto]),
    __metadata("design:returntype", void 0)
], ArbetsorderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArbetsorderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArbetsorderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_arbetsorder_dto_1.UpdateArbetsorderDto]),
    __metadata("design:returntype", void 0)
], ArbetsorderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArbetsorderController.prototype, "remove", null);
exports.ArbetsorderController = ArbetsorderController = __decorate([
    (0, common_1.Controller)('arbetsorder'),
    __metadata("design:paramtypes", [arbetsorder_service_1.ArbetsorderService])
], ArbetsorderController);
//# sourceMappingURL=arbetsorder.controller.js.map