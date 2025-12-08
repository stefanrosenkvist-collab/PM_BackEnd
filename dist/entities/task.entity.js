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
exports.Task = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./project.entity");
const team_member_entity_1 = require("./team-member.entity");
let Task = class Task {
};
exports.Task = Task;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'projectId' }),
    __metadata("design:type", String)
], Task.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.tasks),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_1.Project)
], Task.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigneeId', nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "assigneeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_member_entity_1.TeamMember, (member) => member.tasks, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigneeId' }),
    __metadata("design:type", team_member_entity_1.TeamMember)
], Task.prototype, "assignee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dueDate', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], Task.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], Task.prototype, "updatedAt", void 0);
exports.Task = Task = __decorate([
    (0, typeorm_1.Entity)('Task')
], Task);
//# sourceMappingURL=task.entity.js.map