"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const data_seed_service_1 = require("./data-seed.service");
const role_schema_1 = require("../roles/schemas/role.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const attribute_group_schema_1 = require("../attributes/schemas/attribute-group.schema");
const attribute_definition_schema_1 = require("../attributes/schemas/attribute-definition.schema");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: role_schema_1.Role.name, schema: role_schema_1.RoleSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: attribute_group_schema_1.AttributeGroup.name, schema: attribute_group_schema_1.AttributeGroupSchema },
                { name: attribute_definition_schema_1.AttributeDefinition.name, schema: attribute_definition_schema_1.AttributeDefinitionSchema },
            ]),
        ],
        providers: [data_seed_service_1.DataSeedService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map