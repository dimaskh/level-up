import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import * as schema from '../db/schema';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  findAll() {
    return this.heroesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.heroesService.findOne(id);
  }

  @Post()
  create(@Body() data: typeof schema.heroes.$inferInsert) {
    return this.heroesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<typeof schema.heroes.$inferInsert>,
  ) {
    return this.heroesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.heroesService.remove(id);
  }
}
