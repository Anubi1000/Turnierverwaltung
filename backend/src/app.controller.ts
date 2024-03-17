import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  @ApiTags('other')
  @Get('/ping')
  ping(): string {
    return 'pong';
  }
}
