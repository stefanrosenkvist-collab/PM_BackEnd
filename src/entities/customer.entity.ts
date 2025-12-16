import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Customer')
export class Customer {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'customerName' })
  customerName: string;

  @Column({ name: 'streetAddress', nullable: true })
  streetAddress: string | null;

  @Column({ name: 'postalCode', nullable: true })
  postalCode: string | null;

  @Column({ nullable: true })
  city: string | null;

  @Column({ name: 'contactPerson', nullable: true })
  contactPerson: string | null;

  @Column({ name: 'contactPersonPhone', nullable: true })
  contactPersonPhone: string | null;

  @Column({ name: 'contactPersonEmail', nullable: true })
  contactPersonEmail: string | null;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

