import { Response } from 'express';
import { AttributeGroupsService } from '../services/attribute-groups.service';
import { CreateAttributeGroupDto } from '../dto/create-attribute-group.dto';
import { UpdateAttributeGroupDto } from '../dto/update-attribute-group.dto';
export declare class AttributeGroupsController {
    private readonly attributeGroupsService;
    constructor(attributeGroupsService: AttributeGroupsService);
    getAll(res: Response): Promise<Response<any, Record<string, any>>>;
    getActive(res: Response): Promise<Response<any, Record<string, any>>>;
    getById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    create(dto: CreateAttributeGroupDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, dto: UpdateAttributeGroupDto, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
