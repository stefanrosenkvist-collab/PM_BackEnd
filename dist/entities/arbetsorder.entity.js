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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arbetsorder = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
let Arbetsorder = class Arbetsorder {
};
exports.Arbetsorder = Arbetsorder;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Arbetsorder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'taskId', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task, (task) => task.arbetsorders, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'taskId' }),
    __metadata("design:type", task_entity_1.Task)
], Arbetsorder.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'workplace', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "workplace", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'street', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postalCode', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ourOrderNumber', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "ourOrderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customerOrderNumber', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "customerOrderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contactPerson', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "contactPerson", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contactPersonPhone', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "contactPersonPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contactPersonEmail', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "contactPersonEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'workType', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "workType", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Arbetsorder.prototype, "workStartCheckboxes", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Arbetsorder.prototype, "workCompletionCheckboxes", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Arbetsorder.prototype, "materialUsageCheckboxes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'materialSpecification', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "materialSpecification", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'noSeriousRisksIdentified', default: false }),
    __metadata("design:type", Boolean)
], Arbetsorder.prototype, "noSeriousRisksIdentified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'risksIdentified', default: false }),
    __metadata("design:type", Boolean)
], Arbetsorder.prototype, "risksIdentified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'riskContactNote', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "riskContactNote", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Arbetsorder.prototype, "riskCategories", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Arbetsorder.prototype, "controlledItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'riskDescription', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "riskDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'riskActionInstruction', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Arbetsorder.prototype, "riskActionInstruction", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], Arbetsorder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], Arbetsorder.prototype, "updatedAt", void 0);
exports.Arbetsorder = Arbetsorder = __decorate([
    (0, typeorm_1.Entity)('Arbetsorder')
], Arbetsorder);
//# sourceMappingURL=arbetsorder.entity.js.map