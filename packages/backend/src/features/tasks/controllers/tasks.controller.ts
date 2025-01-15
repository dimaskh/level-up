import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { PaginationParams } from '../../../shared/utils/pagination';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(
    @CurrentUser() heroId: string,
    @Query() params: PaginationParams,
  ) {
    return this.tasksService.findAll(heroId, params);
  }

  @Get(':id')
  findOne(@CurrentUser() heroId: string, @Param('id') id: string) {
    return this.tasksService.findOne(heroId, id);
  }

  @Post()
  create(
    @CurrentUser() heroId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(heroId, createTaskDto);
  }

  @Put(':id')
  update(
    @CurrentUser() heroId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(heroId, id, updateTaskDto);
  }

  @Delete(':id')
  remove(@CurrentUser() heroId: string, @Param('id') id: string) {
    return this.tasksService.remove(heroId, id);
  }
}
