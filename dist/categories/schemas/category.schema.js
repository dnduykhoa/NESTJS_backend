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
exports.CategorySchema = exports.Category = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Category = class Category extends mongoose_2.Document {
    name;
    description;
    displayOrder;
    isActive;
    parent;
};
exports.Category = Category;
__decorate([
    (0, mongoose_1.Prop)({ required: true, maxlength: 100, index: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, type: Number, index: true }),
    __metadata("design:type", Number)
], Category.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true, index: true }),
    __metadata("design:type", Boolean)
], Category.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Category', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Category.prototype, "parent", void 0);
exports.Category = Category = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Category);
exports.CategorySchema = mongoose_1.SchemaFactory.createForClass(Category);
exports.CategorySchema.methods.isRoot = function () {
    return this.parent == null;
};
exports.CategorySchema.methods.getLevel = async function () {
    let level = 0;
    let currentParentId = this.parent;
    const model = this.constructor;
    while (currentParentId != null) {
        level++;
        const parentCategory = await model.findById(currentParentId).exec();
        if (!parentCategory)
            break;
        currentParentId = parentCategory.parent;
    }
    return level;
};
exports.CategorySchema.index({ parent: 1 });
exports.CategorySchema.index({ name: 'text' });
exports.CategorySchema.index({ parent: 1, displayOrder: 1 });
//# sourceMappingURL=category.schema.js.map