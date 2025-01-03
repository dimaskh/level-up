import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { QuestsService } from './quests.service';
import * as schema from '../db/schema';

@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Get()
  findAll() {
    return this.questsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questsService.findOne(id);
  }

  @Get('hero/:heroId')
  findByHero(@Param('heroId') heroId: string) {
    return this.questsService.findByHero(heroId);
  }

  @Post()
  create(@Body() data: typeof schema.quests.$inferInsert) {
    return this.questsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<typeof schema.quests.$inferInsert>,
  ) {
    return this.questsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questsService.remove(id);
  }
}
