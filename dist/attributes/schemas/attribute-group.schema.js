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
exports.AttributeGroupSchema = exports.AttributeGroup = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let AttributeGroup = class AttributeGroup {
};
exports.AttributeGroup = AttributeGroup;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, maxlength: 100 }),
    __metadata("design:type", String)
], AttributeGroup.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null, type: String, maxlength: 500 }),
    __metadata("design:type", String)
], AttributeGroup.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, type: Number }),
    __metadata("design:type", Number)
], AttributeGroup.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], AttributeGroup.prototype, "isActive", void 0);
exports.AttributeGroup = AttributeGroup = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AttributeGroup);
exports.AttributeGroupSchema = mongoose_1.SchemaFactory.createForClass(AttributeGroup);
//# sourceMappingURL=attribute-group.schema.js.map