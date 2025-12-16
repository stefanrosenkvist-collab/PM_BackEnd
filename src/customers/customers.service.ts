import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create({
      id: uuidv4(),
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
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
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

  async remove(id: string) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    await this.customerRepository.remove(customer);
    return customer;
  }
}

