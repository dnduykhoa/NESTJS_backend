"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const attribute_group_schema_1 = require("./schemas/attribute-group.schema");
const attribute_definition_schema_1 = require("./schemas/attribute-definition.schema");
const category_attribute_schema_1 = require("../categories/schemas/category-attribute.schema");
const attribute_groups_controller_1 = require("./controllers/attribute-groups.controller");
const attribute_definitions_controller_1 = require("./controllers/attribute-definitions.controller");
const attribute_groups_service_1 = require("./services/attribute-groups.service");
const attribute_definitions_service_1 = require("./services/attribute-definitions.service");
let AttributesModule = class AttributesModule {
};
exports.AttributesModule = AttributesModule;
exports.AttributesModule = AttributesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: attribute_group_schema_1.AttributeGroup.name, schema: attribute_group_schema_1.AttributeGroupSchema },
                { name: attribute_definition_schema_1.AttributeDefinition.name, schema: attribute_definition_schema_1.AttributeDefinitionSchema },
                { name: category_attribute_schema_1.CategoryAttribute.name, schema: category_attribute_schema_1.CategoryAttributeSchema },
            ]),
        ],
        controllers: [attribute_groups_controller_1.AttributeGroupsController, attribute_definitions_controller_1.AttributeDefinitionsController],
        providers: [attribute_groups_service_1.AttributeGroupsService, attribute_definitions_service_1.AttributeDefinitionsService],
        exports: [attribute_groups_service_1.AttributeGroupsService, attribute_definitions_service_1.AttributeDefinitionsService],
    })
], AttributesModule);
//# sourceMappingURL=attributes.module.js.map