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
        const customer = this.customerRepository.create({
            id: (0, uuid_1.v4)(),
            customerName: createCustomerDto.customerName,
            streetAddress: createCustomerDto.streetAddress || null,
            postalCode: createCustomerDto.postalCode || null,
            city: createCustomerDto.city || null,
            contactPerson: createCustomerDto.contactPerson || null,
            contactPersonPhone: createCustomerDto.contactPersonPhone || null,
            contactPersonEmail: createCustomerDto.contactPersonEmail || null,
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
        const customer = await this.customerRepository.findOne({ where: { id } });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        // Update only provided fields
        if (updateCustomerDto.customerName !== undefined) {
            customer.customerName = updateCustomerDto.customerName;
        }
        if (updateCustomerDto.streetAddress !== undefined) {
            customer.streetAddress = updateCustomerDto.streetAddress || null;
        }
        if (updateCustomerDto.postalCode !== undefined) {
            customer.postalCode = updateCustomerDto.postalCode || null;
        }
        if (updateCustomerDto.city !== undefined) {
            customer.city = updateCustomerDto.city || null;
        }
        if (updateCustomerDto.contactPerson !== undefined) {
            customer.contactPerson = updateCustomerDto.contactPerson || null;
        }
        if (updateCustomerDto.contactPersonPhone !== undefined) {
            customer.contactPersonPhone = updateCustomerDto.contactPersonPhone || null;
        }
        if (updateCustomerDto.contactPersonEmail !== undefined) {
            customer.contactPersonEmail = updateCustomerDto.contactPersonEmail || null;
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