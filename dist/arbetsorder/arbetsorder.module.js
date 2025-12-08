"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbetsorderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const arbetsorder_service_1 = require("./arbetsorder.service");
const arbetsorder_controller_1 = require("./arbetsorder.controller");
const arbetsorder_entity_1 = require("../entities/arbetsorder.entity");
let ArbetsorderModule = class ArbetsorderModule {
};
exports.ArbetsorderModule = ArbetsorderModule;
exports.ArbetsorderModule = ArbetsorderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([arbetsorder_entity_1.Arbetsorder])],
        controllers: [arbetsorder_controller_1.ArbetsorderController],
        providers: [arbetsorder_service_1.ArbetsorderService],
    })
], ArbetsorderModule);
//# sourceMappingURL=arbetsorder.module.js.map