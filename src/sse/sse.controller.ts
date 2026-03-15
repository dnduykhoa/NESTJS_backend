import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { SseService } from './sse.service';

@Controller('sse')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  // GET /sse/subscribe — subscribe to SSE stream (connection stays open)
  @Get('subscribe')
  subscribe(@Res({ passthrough: false }) res: Response): void {
    this.sseService.subscribe(res);
    // Do NOT return anything — the response stays open as an event stream
  }
}
