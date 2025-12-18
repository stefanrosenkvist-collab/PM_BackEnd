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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../entities/task.entity");
const uuid_1 = require("uuid");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async create(createTaskDto) {
        const { dueDate, tags } = createTaskDto, rest = __rest(createTaskDto, ["dueDate", "tags"]);
        const task = this.taskRepository.create(Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, rest), { dueDate: dueDate ? new Date(dueDate) : null, tags: tags !== null && tags !== void 0 ? tags : [] }));
        const saved = await this.taskRepository.save(task);
        return this.taskRepository.findOne({
            where: { id: saved.id },
            relations: ['project', 'assignee'],
        });
    }
    async findAll() {
        return this.taskRepository.find({
            relations: ['project', 'assignee'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByProject(projectId) {
        return this.taskRepository.find({
            where: { projectId },
            relations: ['project', 'assignee'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['project', 'assignee'],
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        const { dueDate, tags } = updateTaskDto, rest = __rest(updateTaskDto, ["dueDate", "tags"]);
        if (dueDate !== undefined)
            task.dueDate = dueDate ? new Date(dueDate) : null;
        if (tags !== undefined)
            task.tags = tags;
        Object.assign(task, rest);
        await this.taskRepository.save(task);
        return this.taskRepository.findOne({
            where: { id },
            relations: ['project', 'assignee'],
        });
    }
    async remove(id) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        await this.taskRepository.remove(task);
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map