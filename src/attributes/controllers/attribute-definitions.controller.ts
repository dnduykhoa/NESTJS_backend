import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AttributeDefinitionsService } from '../services/attribute-definitions.service';
import { CreateAttributeDefinitionDto } from '../dto/create-attribute-definition.dto';
import { UpdateAttributeDefinitionDto } from '../dto/update-attribute-definition.dto';
import { ApiResponse } from '../../common/dto/api-response.dto';

@Controller('attribute-definitions')
export class AttributeDefinitionsController {
  constructor(private readonly attributeDefinitionsService: AttributeDefinitionsService) {}

  @Get()
  async getAll(@Res() res: Response) {
    try {
      const definitions = await this.attributeDefinitionsService.getAllDefinitions();
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy danh sách định nghĩa thuộc tính thành công', definitions));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('active')
  async getActive(@Res() res: Response) {
    try {
      const definitions = await this.attributeDefinitionsService.getActiveDefinitions();
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy định nghĩa thuộc tính đang hoạt động thành công', definitions));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('filterable')
  async getFilterable(@Res() res: Response) {
    try {
      const definitions = await this.attributeDefinitionsService.getFilterableDefinitions();
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy thuộc tính có thể lọc thành công', definitions));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('by-group/:groupId')
  async getByGroup(@Param('groupId') groupId: string, @Res() res: Response) {
    try {
      const definitions = await this.attributeDefinitionsService.getDefinitionsByGroup(groupId);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy thuộc tính theo nhóm thành công', definitions));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get('key/:attrKey')
  async getByKey(@Param('attrKey') attrKey: string, @Res() res: Response) {
    try {
      const definition = await this.attributeDefinitionsService.getDefinitionByKey(attrKey);
      if (!definition) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json(new ApiResponse(`Không tìm thấy thuộc tính với khóa: ${attrKey}`, null));
      }
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy thông tin định nghĩa thuộc tính thành công', definition));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    try {
      const definition = await this.attributeDefinitionsService.getDefinitionById(id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Lấy thông tin định nghĩa thuộc tính thành công', definition));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Post('add')
  async create(@Body() dto: CreateAttributeDefinitionDto, @Res() res: Response) {
    try {
      const definition = await this.attributeDefinitionsService.createDefinition(dto);
      return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse('Tạo định nghĩa thuộc tính thành công', definition));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateAttributeDefinitionDto,
    @Res() res: Response,
  ) {
    try {
      const definition = await this.attributeDefinitionsService.updateDefinition(id, dto);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Cập nhật định nghĩa thuộc tính thành công', definition));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.attributeDefinitionsService.deleteDefinition(id);
      return res
        .status(HttpStatus.OK)
        .json(new ApiResponse('Xóa định nghĩa thuộc tính thành công', null));
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json(new ApiResponse(e.message, null));
    }
  }
}
