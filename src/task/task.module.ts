import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
