import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { GetTasksDto } from "./Dto/get-tasks.dto";
import { Task } from "./task.entity";
import { TaskRepository } from "./task.repository";
import { CreateTaskDto } from "./Dto/create-task.dto";
import { TaskStatus } from "./enums/task-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateTaskDto } from "./Dto/update-task.dto";
import { User } from "../user/user.entity";

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: TaskRepository) {}
  async getTasks(taskFilterDto: GetTasksDto, user: User): Promise<Task[]> {
    try {
      if (Object.keys(taskFilterDto).length) {
        return Promise.resolve(
          await this.taskRepository.getTasks(taskFilterDto, user)
        );
      } else {
        return Promise.resolve(await this.taskRepository.find({where: {user}}));
      }
    } catch (e) {
      return Promise.reject(new InternalServerErrorException());
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    try {
      const requiredTask = await this.taskRepository.findOne({ where: { id, user } });

      if (!requiredTask) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      return Promise.resolve(requiredTask);
    } catch (e) {
      return Promise.reject(new InternalServerErrorException());
    }
  }

  public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    try {
      const task = this.taskRepository.create({
        description: createTaskDto.description,
        title: createTaskDto.title,
        status: TaskStatus.OPEN,
        user
      });
      return Promise.resolve(await this.taskRepository.save(task));
    } catch (e) {
      return Promise.reject(new InternalServerErrorException());
    }
  }

  public async updateTaskStatus(
    updateTaskDto: UpdateTaskDto,
    id: string, user: User
  ): Promise<Task> {
    try {
      const task = await this.getTaskById(id, user);
      task.status = updateTaskDto.status;
      return Promise.resolve(await this.taskRepository.save(task));
    } catch (e) {
      return Promise.reject(new InternalServerErrorException());
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const result = await this.taskRepository.delete({ id });

      if (result.affected === 0) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
    } catch (e) {
      return Promise.reject(new InternalServerErrorException());
    }
  }
}
