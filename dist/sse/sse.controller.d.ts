import { Response } from 'express';
import { SseService } from './sse.service';
export declare class SseController {
    private readonly sseService;
    constructor(sseService: SseService);
    subscribe(res: Response): void;
}
