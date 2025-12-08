import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { TeamMember } from './team-member.entity';
import { Arbetsorder } from './arbetsorder.entity';

@Entity('Task')
export class Task {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'projectId' })
  projectId: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string | null;

  @Column()
  status: string;

  @Column()
  priority: string;

  @Column({ name: 'assigneeId', nullable: true })
  assigneeId: string | null;

  @ManyToOne(() => TeamMember, (member) => member.tasks, { nullable: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee: TeamMember | null;

  @Column({ name: 'dueDate', type: 'timestamp', nullable: true })
  dueDate: Date | null;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @OneToMany(() => Arbetsorder, (arbetsorder) => arbetsorder.task)
  arbetsorders: Arbetsorder[];

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}

