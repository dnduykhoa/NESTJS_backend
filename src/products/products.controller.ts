import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  CreateProductVariantDto,
  UpdateProductVariantDto,
} from './dto/product-variant.dto';
import { VariantResolveDto } from './dto/variant-resolve.dto';
import { ApiResponse } from '../common/dto/api-response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ─── Static collection routes (must be declared BEFORE /:id) ──────────────

  @Get('active')
  async findActive(@Res() res: Response) {
    try {
      const products = await this.productsService.findActive();
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse(
            'Lấy danh sách sản phẩm đang hoạt động thành công',
            products,
          ),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get('out-of-stock')
  async findOutOfStock(@Res() res: Response) {
    try {
      const products = await this.productsService.findOutOfStock();
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy sản phẩm hết hàng thành công', products));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get('inactive')
  async findInactive(@Res() res: Response) {
    try {
      const products = await this.productsService.findInactive();
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse(
            'Lấy danh sách sản phẩm không hoạt động thành công',
            products,
          ),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get('search')
  async searchByName(@Query('name') name: string, @Res() res: Response) {
    try {
      const products = await this.productsService.searchByName(name ?? '');
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Tìm kiếm sản phẩm thành công', products));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get('price-range')
  async findByPriceRange(
    @Query('min') min: string,
    @Query('max') max: string,
    @Res() res: Response,
  ) {
    try {
      const minVal = parseFloat(min) || 0;
      const maxVal = parseFloat(max) || Number.MAX_SAFE_INTEGER;
      const products = await this.productsService.findByPriceRange(
        minVal,
        maxVal,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse(
            'Lấy sản phẩm theo khoảng giá thành công',
            products,
          ),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get('categories')
  async findByCategoriesIds(@Query('ids') ids: string, @Res() res: Response) {
    try {
      const idList = ids
        ? ids
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      const products = await this.productsService.findByCategoriesIds(idList);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse(
            'Lấy sản phẩm theo danh sách danh mục thành công',
            products,
          ),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get('category/:categoryId')
  async findByCategory(
    @Param('categoryId') categoryId: string,
    @Res() res: Response,
  ) {
    try {
      const products = await this.productsService.findByCategory(categoryId);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse(
            'Lấy sản phẩm theo danh mục thành công',
            products,
          ),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get('brand/:brandId')
  async findByBrand(
    @Param('brandId') brandId: string,
    @Res() res: Response,
  ) {
    try {
      const products = await this.productsService.findByBrand(brandId);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse(
            'Lấy sản phẩm theo thương hiệu thành công',
            products,
          ),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get('filter/by-spec')
  async filterByNumericSpec(
    @Query('attrKey') attrKey: string,
    @Query('minValue') minValue: string,
    @Query('maxValue') maxValue: string,
    @Res() res: Response,
  ) {
    try {
      const products = await this.productsService.filterByNumericSpec(
        attrKey,
        parseFloat(minValue) || 0,
        parseFloat(maxValue) || Number.MAX_SAFE_INTEGER,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Lọc sản phẩm theo thông số kỹ thuật thành công', products),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  // ─── Main CRUD ────────────────────────────────────────────────────────────────

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const products = await this.productsService.findAll();
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Lấy danh sách sản phẩm thành công', products),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Post('add')
  @UseInterceptors(FilesInterceptor('files', 20, { storage: memoryStorage() }))
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.create(dto, files ?? []);
      return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse('Tạo sản phẩm thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Put('update/:id')
  @UseInterceptors(FilesInterceptor('files', 20, { storage: memoryStorage() }))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      // When sent as multipart/form-data, deleteMediaIds may arrive as a
      // comma-separated string instead of an array. Normalise it here.
      if (typeof (dto as any).deleteMediaIds === 'string') {
        dto.deleteMediaIds = ((dto as any).deleteMediaIds as string)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
      }
      const product = await this.productsService.update(id, dto, files ?? []);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Cập nhật sản phẩm thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Patch(':id/toggle-active')
  async toggleActive(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productsService.toggleActive(id);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Chuyển đổi trạng thái sản phẩm thành công', product),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Patch(':id/out-of-stock')
  async markOutOfStock(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productsService.markOutOfStock(id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Đánh dấu sản phẩm hết hàng thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productsService.restore(id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Khôi phục sản phẩm thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.productsService.remove(id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Ẩn sản phẩm thành công', null));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  // ─── :id (dynamic — must come AFTER all static-path routes above) ─────────

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productsService.findById(id);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Lấy thông tin sản phẩm thành công', product),
        );
    } catch (e) {
      const status =
        e.status && e.status >= 400 && e.status < 600
          ? e.status
          : HttpStatus.BAD_REQUEST;
      return res.status(status).json(new ApiResponse(e.message, null));
    }
  }

  // ─── Product Media ────────────────────────────────────────────────────────────

  @Get(':productId/media')
  async getProductMedia(
    @Param('productId') productId: string,
    @Res() res: Response,
  ) {
    try {
      const media = await this.productsService.getProductMedia(productId);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy media sản phẩm thành công', media));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Delete(':productId/media/:mediaId')
  async deleteProductMedia(
    @Param('productId') productId: string,
    @Param('mediaId') mediaId: string,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.deleteProductMedia(
        productId,
        mediaId,
      );
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Xóa media sản phẩm thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Put(':productId/media/:mediaId/set-primary')
  async setPrimaryMedia(
    @Param('productId') productId: string,
    @Param('mediaId') mediaId: string,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.setPrimaryMedia(
        productId,
        mediaId,
      );
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Đặt ảnh chính thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  // ─── Variant routes ───────────────────────────────────────────────────────────
  // IMPORTANT: static-segment routes (options, add, update/:id, delete/:id,
  // resolve) must be declared BEFORE the dynamic /:variantId route so NestJS
  // does not swallow them with the parameterised handler.

  @Get(':productId/variants/options')
  async getVariantOptions(
    @Param('productId') productId: string,
    @Res() res: Response,
  ) {
    try {
      const options = await this.productsService.getVariantOptions(productId);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Lấy tùy chọn biến thể thành công', options),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Post(':productId/variants/add')
  async createVariant(
    @Param('productId') productId: string,
    @Body() dto: CreateProductVariantDto,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.createVariant(productId, dto);
      return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse('Tạo biến thể thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Put(':productId/variants/update/:variantId')
  async updateVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Body() dto: UpdateProductVariantDto,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.updateVariant(
        productId,
        variantId,
        dto,
      );
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Cập nhật biến thể thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Delete(':productId/variants/delete/:variantId')
  async deleteVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.deleteVariant(
        productId,
        variantId,
      );
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Xóa biến thể thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Post(':productId/variants/resolve')
  async resolveVariant(
    @Param('productId') productId: string,
    @Body() dto: VariantResolveDto,
    @Res() res: Response,
  ) {
    try {
      const variant = await this.productsService.resolveVariant(
        productId,
        dto.selections,
      );
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Tìm biến thể phù hợp thành công', variant));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  // Dynamic variant routes (after all static ones)

  @Get(':productId/variants')
  async getVariants(
    @Param('productId') productId: string,
    @Query('onlyActive') onlyActive: string,
    @Res() res: Response,
  ) {
    try {
      const activeOnly = onlyActive === 'true';
      const variants = await this.productsService.getVariants(
        productId,
        activeOnly,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Lấy danh sách biến thể thành công', variants),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  // Variant media — declare before /:variantId to avoid shadowing
  @Get(':productId/variants/:variantId/media')
  async getVariantMedia(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Res() res: Response,
  ) {
    try {
      const media = await this.productsService.getVariantMedia(
        productId,
        variantId,
      );
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy media biến thể thành công', media));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Post(':productId/variants/:variantId/media/upload')
  @UseInterceptors(FilesInterceptor('files', 20, { storage: memoryStorage() }))
  async uploadVariantMedia(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.uploadVariantMedia(
        productId,
        variantId,
        files ?? [],
      );
      return res
        .status(HttpStatus.CREATED)
        .json(
          new ApiResponse('Upload media cho biến thể thành công', product),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Delete(':productId/variants/:variantId/media/:mediaId')
  async deleteVariantMedia(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Param('mediaId') mediaId: string,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.deleteVariantMedia(
        productId,
        variantId,
        mediaId,
      );
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Xóa media biến thể thành công', product));
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Put(':productId/variants/:variantId/media/:mediaId/set-primary')
  async setVariantMediaPrimary(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Param('mediaId') mediaId: string,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.setVariantMediaPrimary(
        productId,
        variantId,
        mediaId,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Đặt ảnh chính cho biến thể thành công', product),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Get(':productId/variants/:variantId')
  async getVariant(
    @Param('productId') productId: string,
    @Param('variantId') variantId: string,
    @Res() res: Response,
  ) {
    try {
      const variant = await this.productsService.getVariant(
        productId,
        variantId,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Lấy thông tin biến thể thành công', variant),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  // ─── Specification routes ─────────────────────────────────────────────────────
  // Static sub-routes (add, update/:id, delete/:id, clear) before any dynamic one.

  @Get(':productId/specifications')
  async getSpecs(
    @Param('productId') productId: string,
    @Res() res: Response,
  ) {
    try {
      const specs = await this.productsService.getSpecs(productId);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Lấy thông số kỹ thuật thành công', specs),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Post(':productId/specifications/add')
  async addSpec(
    @Param('productId') productId: string,
    @Body()
    body: {
      attrDefId?: string;
      specKey: string;
      specValue?: string;
      valueNumber?: number;
      displayOrder?: number;
    },
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.addSpec(productId, body);
      return res
        .status(HttpStatus.CREATED)
        .json(
          new ApiResponse('Thêm thông số kỹ thuật thành công', product),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Put(':productId/specifications/update/:specId')
  async updateSpec(
    @Param('productId') productId: string,
    @Param('specId') specId: string,
    @Body()
    body: {
      attrDefId?: string;
      specKey?: string;
      specValue?: string;
      valueNumber?: number;
      displayOrder?: number;
    },
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.updateSpec(
        productId,
        specId,
        body,
      );
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Cập nhật thông số kỹ thuật thành công', product),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Delete(':productId/specifications/delete/:specId')
  async deleteSpec(
    @Param('productId') productId: string,
    @Param('specId') specId: string,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.deleteSpec(productId, specId);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse('Xóa thông số kỹ thuật thành công', product),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }

  @Delete(':productId/specifications/clear')
  async clearSpecs(
    @Param('productId') productId: string,
    @Res() res: Response,
  ) {
    try {
      const product = await this.productsService.clearSpecs(productId);
      return res
        .status(HttpStatus.OK)
        .json(
          new ApiResponse(
            'Xóa toàn bộ thông số kỹ thuật thành công',
            product,
          ),
        );
    } catch (e) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ApiResponse(e.message, null));
    }
  }
}
