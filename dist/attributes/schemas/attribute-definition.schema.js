"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributeDefinitionSchema = exports.AttributeDefinition = exports.DataType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var DataType;
(function (DataType) {
    DataType["STRING"] = "STRING";
    DataType["NUMBER"] = "NUMBER";
    DataType["BOOLEAN"] = "BOOLEAN";
    DataType["LIST"] = "LIST";
})(DataType || (exports.DataType = DataType = {}));
let AttributeDefinition = class AttributeDefinition extends mongoose_2.Document {
    name;
    attrKey;
    dataType;
    unit;
    isFilterable;
    isRequired;
    displayOrder;
    isActive;
    attributeGroup;
};
exports.AttributeDefinition = AttributeDefinition;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100 }),
    __metadata("design:type", String)
], AttributeDefinition.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100 }),
    __metadata("design:type", String)
], AttributeDefinition.prototype, "attrKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: DataType,
        type: String,
        default: DataType.STRING,
    }),
    __metadata("design:type", String)
], AttributeDefinition.prototype, "dataType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ maxlength: 50 }),
    __metadata("design:type", String)
], AttributeDefinition.prototype, "unit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], AttributeDefinition.prototype, "isFilterable", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], AttributeDefinition.prototype, "isRequired", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AttributeDefinition.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], AttributeDefinition.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'AttributeGroup' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], AttributeDefinition.prototype, "attributeGroup", void 0);
exports.AttributeDefinition = AttributeDefinition = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AttributeDefinition);
exports.AttributeDefinitionSchema = mongoose_1.SchemaFactory.createForClass(AttributeDefinition);
exports.AttributeDefinitionSchema.index({ attrKey: 1 }, { unique: true });
exports.AttributeDefinitionSchema.index({ isActive: 1 });
exports.AttributeDefinitionSchema.index({ displayOrder: 1 });
//# sourceMappingURL=attribute-definition.schema.js.map