import { IsEmpty, IsOptional, IsEnum } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class GetTasksDto {
  @IsOptional()
  @IsEmpty()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: string;
}
