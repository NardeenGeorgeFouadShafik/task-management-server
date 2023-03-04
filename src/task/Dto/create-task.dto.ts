import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
