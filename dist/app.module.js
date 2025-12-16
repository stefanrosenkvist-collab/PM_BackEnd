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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const projects_module_1 = require("./projects/projects.module");
const tasks_module_1 = require("./tasks/tasks.module");
const team_module_1 = require("./team/team.module");
const arbetsorder_module_1 = require("./arbetsorder/arbetsorder.module");
const customers_module_1 = require("./customers/customers.module");
const project_entity_1 = require("./entities/project.entity");
const task_entity_1 = require("./entities/task.entity");
const team_member_entity_1 = require("./entities/team-member.entity");
const arbetsorder_entity_1 = require("./entities/arbetsorder.entity");
const customer_entity_1 = require("./entities/customer.entity");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Get DATABASE_URL from environment
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: databaseUrl, // TypeORM can parse the connection URL directly
                entities: [project_entity_1.Project, task_entity_1.Task, team_member_entity_1.TeamMember, arbetsorder_entity_1.Arbetsorder, customer_entity_1.Customer],
                synchronize: false, // Set to false for production, use migrations instead
                logging: true, // Enable all logging to see the actual error
            }),
            projects_module_1.ProjectsModule,
            tasks_module_1.TasksModule,
            team_module_1.TeamModule,
            arbetsorder_module_1.ArbetsorderModule,
            customers_module_1.CustomersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map