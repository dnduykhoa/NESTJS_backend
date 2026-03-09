"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryAttributeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_category_attribute_dto_1 = require("./create-category-attribute.dto");
class UpdateCategoryAttributeDto extends (0, mapped_types_1.PartialType)(create_category_attribute_dto_1.CreateCategoryAttributeDto) {
}
exports.UpdateCategoryAttributeDto = UpdateCategoryAttributeDto;
//# sourceMappingURL=update-category-attribute.dto.js.map