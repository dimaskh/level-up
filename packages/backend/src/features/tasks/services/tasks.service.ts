import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { tasks } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { PaginationParams, getPaginationOptions } from '../../../shared/utils/pagination';
import { DrizzleDatabase } from '../../../db/db.types';

@Injectable()
export class TasksService {
  constructor(@Inject('DB') private readonly db: DrizzleDatabase) {}

  async findAll(heroId: string, params: PaginationParams) {
    const { skip, take } = getPaginationOptions(params);
    const [items, total] = await Promise.all([
      this.db.query.tasks.findMany({
        where: eq(tasks.heroId, heroId),
        orderBy: (tasks) => [tasks.createdAt],
        offset: skip,
        limit: take,
      }),
      this.db.query.tasks.findMany({
        where: eq(tasks.heroId, heroId),
        columns: {
          id: true,
        },
      }).then(rows => rows.length),
    ]);

    return {
      items,
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / take),
    };
  }

  async findOne(heroId: string, id: string) {
    const [result] = await this.db.query.tasks.findMany({
      where: eq(tasks.id, id),
      limit: 1,
    });
    
    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    
    return result;
  }

  async create(heroId: string, createTaskDto: CreateTaskDto) {
    const insertData: any = {
      heroId,
      title: createTaskDto.title,
      description: createTaskDto.description,
    };

    if (createTaskDto.status) {
      insertData.status = createTaskDto.status;
    }

    if (createTaskDto.dueDate) {
      insertData.dueDate = createTaskDto.dueDate;
    }

    const [result] = await this.db
      .insert(tasks)
      .values(insertData)
      .returning();
    return result;
  }

  async update(heroId: string, id: string, updateTaskDto: UpdateTaskDto) {
    const updateData: any = {};

    if (updateTaskDto.title) {
      updateData.title = updateTaskDto.title;
    }
    if (updateTaskDto.description) {
      updateData.description = updateTaskDto.description;
    }
    if (updateTaskDto.status) {
      updateData.status = updateTaskDto.status;
    }
    if (updateTaskDto.dueDate) {
      updateData.dueDate = updateTaskDto.dueDate;
    }
    updateData.updatedAt = new Date();

    const [result] = await this.db
      .update(tasks)
      .set(updateData)
      .where(eq(tasks.id, id))
      .returning();
    
    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    
    return result;
  }

  async remove(heroId: string, id: string) {
    const [result] = await this.db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    
    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    
    return result;
  }
}
