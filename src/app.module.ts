import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TeamModule } from './team/team.module';
import { ArbetsorderModule } from './arbetsorder/arbetsorder.module';
import { CustomersModule } from './customers/customers.module';
import { Project } from './entities/project.entity';
import { Task } from './entities/task.entity';
import { TeamMember } from './entities/team-member.entity';
import { Arbetsorder } from './entities/arbetsorder.entity';
import { Customer } from './entities/customer.entity';
import * as dotenv from 'dotenv';

dotenv.config();

// Get DATABASE_URL from environment
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: databaseUrl, // TypeORM can parse the connection URL directly
      entities: [Project, Task, TeamMember, Arbetsorder, Customer],
      synchronize: false, // Set to false for production, use migrations instead
      logging: true, // Enable all logging to see the actual error
    }),
    ProjectsModule,
    TasksModule,
    TeamModule,
    ArbetsorderModule,
    CustomersModule,
  ],
})
export class AppModule {}

