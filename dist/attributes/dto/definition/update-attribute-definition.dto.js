"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttributeDefinitionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_attribute_definition_dto_1 = require("./create-attribute-definition.dto");
class UpdateAttributeDefinitionDto extends (0, mapped_types_1.PartialType)(create_attribute_definition_dto_1.CreateAttributeDefinitionDto) {
}
exports.UpdateAttributeDefinitionDto = UpdateAttributeDefinitionDto;
//# sourceMappingURL=update-attribute-definition.dto.js.map