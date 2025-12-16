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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../entities/customer.entity");
const uuid_1 = require("uuid");
let CustomersService = class CustomersService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async create(createCustomerDto) {
        var _a, _b, _c, _d, _e, _f;
        const customer = this.customerRepository.create({
            id: (0, uuid_1.v4)(),
            customerName: createCustomerDto.customerName,
            streetAddress: (_a = createCustomerDto.streetAddress) !== null && _a !== void 0 ? _a : null,
            postalCode: (_b = createCustomerDto.postalCode) !== null && _b !== void 0 ? _b : null,
            city: (_c = createCustomerDto.city) !== null && _c !== void 0 ? _c : null,
            contactPerson: (_d = createCustomerDto.contactPerson) !== null && _d !== void 0 ? _d : null,
            contactPersonPhone: (_e = createCustomerDto.contactPersonPhone) !== null && _e !== void 0 ? _e : null,
            contactPersonEmail: (_f = createCustomerDto.contactPersonEmail) !== null && _f !== void 0 ? _f : null,
        });
        return await this.customerRepository.save(customer);
    }
    async findAll() {
        try {
            return await this.customerRepository.find({
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw error;
        }
    }
    async findOne(id) {
        const customer = await this.customerRepository.findOne({
            where: { id },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }
    async update(id, updateCustomerDto) {
        var _a, _b, _c, _d, _e, _f;
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        // Update only provided fields
        if (updateCustomerDto.customerName !== undefined) {
            customer.customerName = updateCustomerDto.customerName;
        }
        if (updateCustomerDto.streetAddress !== undefined) {
            customer.streetAddress = (_a = updateCustomerDto.streetAddress) !== null && _a !== void 0 ? _a : null;
        }
        if (updateCustomerDto.postalCode !== undefined) {
            customer.postalCode = (_b = updateCustomerDto.postalCode) !== null && _b !== void 0 ? _b : null;
        }
        if (updateCustomerDto.city !== undefined) {
            customer.city = (_c = updateCustomerDto.city) !== null && _c !== void 0 ? _c : null;
        }
        if (updateCustomerDto.contactPerson !== undefined) {
            customer.contactPerson = (_d = updateCustomerDto.contactPerson) !== null && _d !== void 0 ? _d : null;
        }
        if (updateCustomerDto.contactPersonPhone !== undefined) {
            customer.contactPersonPhone = (_e = updateCustomerDto.contactPersonPhone) !== null && _e !== void 0 ? _e : null;
        }
        if (updateCustomerDto.contactPersonEmail !== undefined) {
            customer.contactPersonEmail = (_f = updateCustomerDto.contactPersonEmail) !== null && _f !== void 0 ? _f : null;
        }
        await this.customerRepository.save(customer);
        return this.customerRepository.findOne({ where: { id } });
    }
    async remove(id) {
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        await this.customerRepository.remove(customer);
        return customer;
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map