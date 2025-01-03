import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { QuestsService } from './quests.service';
import * as schema from '../db/schema';

@ApiTags('quests')
@Controller('quests')
export class QuestsController {
  constructor(private readonly questsService: QuestsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quests' })
  @ApiResponse({ status: 200, description: 'Return all quests.' })
  findAll() {
    return this.questsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quest by id' })
  @ApiParam({ name: 'id', description: 'Quest ID' })
  @ApiResponse({ status: 200, description: 'Return the quest.' })
  @ApiResponse({ status: 404, description: 'Quest not found.' })
  findOne(@Param('id') id: string) {
    return this.questsService.findOne(id);
  }

  @Get('hero/:heroId')
  @ApiOperation({ summary: 'Get quests by hero id' })
  @ApiParam({ name: 'heroId', description: 'Hero ID' })
  @ApiResponse({ status: 200, description: 'Return the quests.' })
  findByHero(@Param('heroId') heroId: string) {
    return this.questsService.findByHero(heroId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new quest' })
  @ApiResponse({ status: 201, description: 'The quest has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() data: typeof schema.quests.$inferInsert) {
    return this.questsService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a quest' })
  @ApiParam({ name: 'id', description: 'Quest ID' })
  @ApiResponse({ status: 200, description: 'The quest has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Quest not found.' })
  update(
    @Param('id') id: string,
    @Body() data: Partial<typeof schema.quests.$inferInsert>,
  ) {
    return this.questsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quest' })
  @ApiParam({ name: 'id', description: 'Quest ID' })
  @ApiResponse({ status: 200, description: 'The quest has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Quest not found.' })
  remove(@Param('id') id: string) {
    return this.questsService.remove(id);
  }
}
