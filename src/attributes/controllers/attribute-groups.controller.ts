import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeGroupsService } from '../services/attribute-groups.service';
import { CreateAttributeGroupDto } from '../dto/group/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/group/update-attribute-group.dto';

@Controller('attribute-groups')
export class AttributeGroupsController {
  constructor(private readonly attributeGroupsService: AttributeGroupsService) {}

  @Post()
  create(@Body() dto: CreateAttributeGroupDto) {
    return this.attributeGroupsService.create(dto);
  }

  @Get()
  findAll() {
    return this.attributeGroupsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.attributeGroupsService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeGroupsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAttributeGroupDto) {
    return this.attributeGroupsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeGroupsService.remove(id);
  }
}
