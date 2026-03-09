"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAttributeGroupDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_attribute_group_dto_1 = require("./create-attribute-group.dto");
class UpdateAttributeGroupDto extends (0, mapped_types_1.PartialType)(create_attribute_group_dto_1.CreateAttributeGroupDto) {
}
exports.UpdateAttributeGroupDto = UpdateAttributeGroupDto;
//# sourceMappingURL=update-attribute-group.dto.js.map