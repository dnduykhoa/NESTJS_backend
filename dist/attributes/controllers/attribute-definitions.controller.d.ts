import { Response } from 'express';
import { AttributeDefinitionsService } from '../services/attribute-definitions.service';
import { CreateAttributeDefinitionDto } from '../dto/create-attribute-definition.dto';
import { UpdateAttributeDefinitionDto } from '../dto/update-attribute-definition.dto';
export declare class AttributeDefinitionsController {
    private readonly attributeDefinitionsService;
    constructor(attributeDefinitionsService: AttributeDefinitionsService);
    getAll(res: Response): Promise<Response<any, Record<string, any>>>;
    getActive(res: Response): Promise<Response<any, Record<string, any>>>;
    getFilterable(res: Response): Promise<Response<any, Record<string, any>>>;
    getByGroup(groupId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getByKey(attrKey: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getById(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    create(dto: CreateAttributeDefinitionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, dto: UpdateAttributeDefinitionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    delete(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
