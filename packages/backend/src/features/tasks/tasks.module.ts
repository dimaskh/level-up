import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { DbModule } from '../../db/db.module';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
