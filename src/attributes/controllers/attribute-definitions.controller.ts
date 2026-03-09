import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeDefinitionsService } from '../services/attribute-definitions.service';
import { CreateAttributeDefinitionDto } from '../dto/definition/create-attribute-definition.dto';
import { UpdateAttributeDefinitionDto } from '../dto/definition/update-attribute-definition.dto';

@Controller('attribute-definitions')
export class AttributeDefinitionsController {
  constructor(private readonly attributeDefinitionsService: AttributeDefinitionsService) {}

  @Post()
  create(@Body() dto: CreateAttributeDefinitionDto) {
    return this.attributeDefinitionsService.create(dto);
  }

  @Get()
  findAll() {
    return this.attributeDefinitionsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.attributeDefinitionsService.findActive();
  }

  @Get('filterable')
  findFilterable() {
    return this.attributeDefinitionsService.findFilterable();
  }

  @Get('by-group/:groupId')
  findByGroup(@Param('groupId') groupId: string) {
    return this.attributeDefinitionsService.findByGroup(groupId);
  }

  @Get('key/:attrKey')
  findByKey(@Param('attrKey') attrKey: string) {
    return this.attributeDefinitionsService.findByKey(attrKey);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeDefinitionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAttributeDefinitionDto) {
    return this.attributeDefinitionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeDefinitionsService.remove(id);
  }
}
