import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('Project')
export class Project {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column()
  status: string; // 'active' | 'completed' | 'on-hold'

  @Column()
  priority: string; // 'low' | 'medium' | 'high'

  @Column({ name: 'startDate', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'endDate', type: 'timestamp', nullable: true })
  endDate: Date | null;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

