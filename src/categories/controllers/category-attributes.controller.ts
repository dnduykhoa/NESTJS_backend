import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoryAttributesService } from '../services/category-attributes.service';
import { CreateCategoryAttributeDto } from '../dto/category-attributes/create-category-attribute.dto';
import { UpdateCategoryAttributeDto } from '../dto/category-attributes/update-category-attribute.dto';

@Controller('category-attributes')
export class CategoryAttributesController {
  constructor(private readonly categoryAttributesService: CategoryAttributesService) {}

  @Post('assign')
  assign(@Body() dto: CreateCategoryAttributeDto) {
    return this.categoryAttributesService.assign(dto);
  }

  @Get('by-category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.categoryAttributesService.findByCategory(categoryId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryAttributeDto) {
    return this.categoryAttributesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryAttributesService.remove(id);
  }

  @Delete()
  removeByKeys(@Query('categoryId') categoryId: string, @Query('attrDefId') attrDefId: string) {
    return this.categoryAttributesService.removeByKeys(categoryId, attrDefId);
  }
}
