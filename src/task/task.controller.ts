import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { GetTasksDto } from "./Dto/get-tasks.dto";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./Dto/create-task.dto";
import { UpdateTaskDto } from "./Dto/update-task.dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../user/get_user.decorator";
import { User } from "src/user/user.entity";
import { RolesGuard } from "../user/user_role.guard";

@Controller("task")
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getTasks(@Query() taskFilterDto: GetTasksDto,  @GetUser() user: User): Promise<Task[]> {
    try {
      return Promise.resolve(await this.taskService.getTasks(taskFilterDto, user));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskById(id,user);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Patch("/status/:id")
  updateTaskStatus(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
	@GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(updateTaskDto, id, user);
  }

  @Delete("/:id")
  @UseGuards(RolesGuard)
  deleteTask(@Param("id") id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
