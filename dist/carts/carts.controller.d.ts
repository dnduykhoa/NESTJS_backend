import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    create(createCartDto: CreateCartDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCartDto: UpdateCartDto): string;
    remove(id: string): string;
}
