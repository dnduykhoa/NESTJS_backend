"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseService = void 0;
const common_1 = require("@nestjs/common");
let SseService = class SseService {
    constructor() {
        this.clients = [];
    }
    subscribe(res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        this.clients.push(res);
        res.on('close', () => {
            this.clients = this.clients.filter((c) => c !== res);
        });
        res.write('data: connected\n\n');
    }
    broadcastProductUpdate(product) {
        this.sendToAll({ type: 'PRODUCT_UPDATE', data: product });
    }
    broadcastVariantUpdate(productId, variant) {
        this.sendToAll({ type: 'VARIANT_UPDATE', data: { productId, variant } });
    }
    sendToAll(payload) {
        const data = `data: ${JSON.stringify(payload)}\n\n`;
        this.clients = this.clients.filter((client) => {
            try {
                client.write(data);
                return true;
            }
            catch {
                return false;
            }
        });
    }
};
exports.SseService = SseService;
exports.SseService = SseService = __decorate([
    (0, common_1.Injectable)()
], SseService);
//# sourceMappingURL=sse.service.js.map