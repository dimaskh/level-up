import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { PaginationParams, createPaginatedResponse, getPaginationOptions } from '../../../shared/utils/pagination';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(userId: string, params: PaginationParams) {
    const { skip, take } = getPaginationOptions(params);
    const [items, total] = await this.taskRepository.findAndCount({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    return createPaginatedResponse(items, total, params);
  }

  async findOne(userId: string, id: string) {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create({
      ...createTaskDto,
      user: { id: userId },
    });

    return this.taskRepository.save(task);
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(userId, id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(userId: string, id: string) {
    const task = await this.findOne(userId, id);
    await this.taskRepository.remove(task);
  }
}
