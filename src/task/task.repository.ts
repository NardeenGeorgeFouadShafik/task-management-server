import {  Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { GetTasksDto } from './Dto/get-tasks.dto';
import { User } from '../user/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  async getTasks(taskFilterDto: GetTasksDto, user: User): Promise<Task[]> {
    const { status, search } = taskFilterDto;
    const query = this.createQueryBuilder('tasks').where({user});
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search },
      );
    }

    return Promise.resolve(await query.getMany());
  }
}
