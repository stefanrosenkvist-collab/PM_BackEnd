import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('Arbetsorder')
export class Arbetsorder {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'taskId', nullable: true })
  taskId: string | null;

  @ManyToOne(() => Task, (task) => task.arbetsorders, { nullable: true })
  @JoinColumn({ name: 'taskId' })
  task: Task | null;

  // Header fields
  @Column({ name: 'workplace', nullable: true })
  workplace: string | null;

  @Column({ name: 'street', nullable: true })
  street: string | null;

  @Column({ name: 'postalCode', nullable: true })
  postalCode: string | null;

  @Column({ name: 'city', nullable: true })
  city: string | null;

  @Column({ name: 'ourOrderNumber', nullable: true })
  ourOrderNumber: string | null;

  @Column({ name: 'customerOrderNumber', nullable: true })
  customerOrderNumber: string | null;

  @Column({ name: 'contactPerson', nullable: true })
  contactPerson: string | null;

  @Column({ name: 'contactPersonPhone', nullable: true })
  contactPersonPhone: string | null;

  @Column({ name: 'contactPersonEmail', nullable: true })
  contactPersonEmail: string | null;

  @Column({ name: 'workType', nullable: true })
  workType: string | null;

  // Work start checkboxes
  @Column('text', { array: true, default: [] })
  workStartCheckboxes: string[];

  // Work completion checkboxes
  @Column('text', { array: true, default: [] })
  workCompletionCheckboxes: string[];

  // Material usage
  @Column('text', { array: true, default: [] })
  materialUsageCheckboxes: string[];

  @Column({ name: 'materialSpecification', type: 'text', nullable: true })
  materialSpecification: string | null;

  // Risk assessment
  @Column({ name: 'noSeriousRisksIdentified', default: false })
  noSeriousRisksIdentified: boolean;

  @Column({ name: 'risksIdentified', default: false })
  risksIdentified: boolean;

  @Column({ name: 'riskContactNote', nullable: true })
  riskContactNote: string | null;

  @Column('text', { array: true, default: [] })
  riskCategories: string[];

  @Column('text', { array: true, default: [] })
  controlledItems: string[];

  @Column({ name: 'riskDescription', type: 'text', nullable: true })
  riskDescription: string | null;

  @Column({ name: 'riskActionInstruction', type: 'text', nullable: true })
  riskActionInstruction: string | null;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

