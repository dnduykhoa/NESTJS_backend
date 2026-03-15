import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class SseService {
  private clients: Response[] = [];

  subscribe(res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    this.clients.push(res);

    res.on('close', () => {
      this.clients = this.clients.filter((c) => c !== res);
    });

    // Keep-alive ping to confirm connection
    res.write('data: connected\n\n');
  }

  broadcastProductUpdate(product: any): void {
    this.sendToAll({ type: 'PRODUCT_UPDATE', data: product });
  }

  broadcastVariantUpdate(productId: string, variant: any): void {
    this.sendToAll({ type: 'VARIANT_UPDATE', data: { productId, variant } });
  }

  private sendToAll(payload: any): void {
    const data = `data: ${JSON.stringify(payload)}\n\n`;
    this.clients = this.clients.filter((client) => {
      try {
        client.write(data);
        return true;
      } catch {
        return false;
      }
    });
  }
}
