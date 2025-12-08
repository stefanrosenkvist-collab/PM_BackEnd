import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('TeamMember')
export class TeamMember {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @Column()
  status: string; // 'active' | 'inactive'

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}

