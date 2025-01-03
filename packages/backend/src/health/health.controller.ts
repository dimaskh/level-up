import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health-check')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Check server health' })
  @ApiResponse({ 
    status: 200, 
    description: 'Server is healthy',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok'
        },
        timestamp: {
          type: 'string',
          example: '2025-01-03T20:22:03.000Z'
        }
      }
    }
  })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }
}
