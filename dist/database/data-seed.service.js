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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DataSeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const role_schema_1 = require("../roles/schemas/role.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const attribute_group_schema_1 = require("../attributes/schemas/attribute-group.schema");
const attribute_definition_schema_1 = require("../attributes/schemas/attribute-definition.schema");
let DataSeedService = DataSeedService_1 = class DataSeedService {
    constructor(roleModel, userModel, attrGroupModel, attrDefModel) {
        this.roleModel = roleModel;
        this.userModel = userModel;
        this.attrGroupModel = attrGroupModel;
        this.attrDefModel = attrDefModel;
        this.logger = new common_1.Logger(DataSeedService_1.name);
    }
    async onApplicationBootstrap() {
        await this.seedRoles();
        await this.seedAdminUser();
        await this.seedAttributeGroups();
        await this.seedAttributeDefinitions();
    }
    async seedRoles() {
        const roles = [
            { name: 'ADMIN', description: 'Quản trị viên - Có toàn quyền quản lý hệ thống' },
            { name: 'MANAGER', description: 'Quản lý - Quản lý sản phẩm, đơn hàng và nhân viên' },
            { name: 'STAFF', description: 'Nhân viên - Xử lý đơn hàng và hỗ trợ khách hàng' },
            { name: 'USER', description: 'Người dùng - Khách hàng thông thường' },
        ];
        let created = 0;
        for (const r of roles) {
            const exists = await this.roleModel.findOne({ name: r.name });
            if (!exists) {
                await this.roleModel.create(r);
                created++;
            }
        }
        if (created > 0) {
            this.logger.log(`✓ Seeded ${created} role(s): ADMIN, MANAGER, STAFF, USER`);
        }
        else {
            this.logger.log('✓ Roles đã tồn tại, bỏ qua seed');
        }
    }
    async seedAdminUser() {
        const exists = await this.userModel.findOne({ username: 'admin' });
        if (exists) {
            this.logger.log('✓ Tài khoản admin đã tồn tại, bỏ qua seed');
            return;
        }
        const adminRole = await this.roleModel.findOne({ name: 'ADMIN' });
        if (!adminRole) {
            this.logger.warn('⚠ Không tìm thấy role ADMIN, bỏ qua tạo admin user');
            return;
        }
        const hashed = await bcrypt.hash('Admin@12345', 10);
        await this.userModel.create({
            username: 'admin',
            password: hashed,
            email: 'admin@techstore.com',
            fullName: 'Quản trị viên hệ thống',
            phone: '0999999999',
            provider: 'local',
            role: adminRole._id,
        });
        this.logger.log('✓ Tạo tài khoản admin — username: admin | password: Admin@12345');
    }
    async seedAttributeGroups() {
        const groups = [
            { name: 'Hiệu năng', description: 'CPU, RAM, bộ nhớ trong, card đồ họa...', displayOrder: 1 },
            { name: 'Màn hình', description: 'Kích thước, độ phân giải, tần số quét, tấm nền...', displayOrder: 2 },
            { name: 'Lưu trữ', description: 'SSD, HDD, eMMC, dung lượng lưu trữ...', displayOrder: 3 },
            { name: 'Kết nối', description: 'WiFi, Bluetooth, USB, HDMI, cổng sạc...', displayOrder: 4 },
            { name: 'Pin & Sạc', description: 'Dung lượng pin, công suất sạc, thời lượng pin...', displayOrder: 5 },
            { name: 'Camera', description: 'Độ phân giải camera sau, trước, số lượng camera...', displayOrder: 6 },
            { name: 'Thiết kế', description: 'Kích thước, trọng lượng, màu sắc, chất liệu...', displayOrder: 7 },
            { name: 'Hệ điều hành', description: 'Hệ điều hành, phiên bản...', displayOrder: 8 },
        ];
        let created = 0;
        for (const g of groups) {
            const exists = await this.attrGroupModel.findOne({ name: g.name });
            if (!exists) {
                await this.attrGroupModel.create({ ...g, isActive: true });
                created++;
            }
        }
        if (created > 0) {
            this.logger.log(`✓ Seeded ${created} attribute group(s)`);
        }
        else {
            this.logger.log('✓ Attribute groups đã tồn tại, bỏ qua seed');
        }
    }
    async seedAttributeDefinitions() {
        const getGroup = async (name) => this.attrGroupModel.findOne({ name });
        const defs = [
            { name: 'CPU', attrKey: 'cpu', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: true, groupName: 'Hiệu năng', displayOrder: 1 },
            { name: 'RAM', attrKey: 'ram', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'GB', isFilterable: true, isRequired: true, groupName: 'Hiệu năng', displayOrder: 2 },
            { name: 'Card đồ họa', attrKey: 'gpu', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Hiệu năng', displayOrder: 3 },
            { name: 'Tốc độ CPU', attrKey: 'cpu_speed', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'GHz', isFilterable: true, isRequired: false, groupName: 'Hiệu năng', displayOrder: 4 },
            { name: 'Số nhân CPU', attrKey: 'cpu_cores', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'nhân', isFilterable: true, isRequired: false, groupName: 'Hiệu năng', displayOrder: 5 },
            { name: 'Kích thước màn hình', attrKey: 'screen_size', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'inch', isFilterable: true, isRequired: false, groupName: 'Màn hình', displayOrder: 1 },
            { name: 'Độ phân giải', attrKey: 'screen_resolution', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Màn hình', displayOrder: 2 },
            { name: 'Tần số quét', attrKey: 'refresh_rate', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'Hz', isFilterable: true, isRequired: false, groupName: 'Màn hình', displayOrder: 3 },
            { name: 'Công nghệ tấm nền', attrKey: 'panel_type', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Màn hình', displayOrder: 4 },
            { name: 'Độ sáng tối đa', attrKey: 'brightness', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'nits', isFilterable: false, isRequired: false, groupName: 'Màn hình', displayOrder: 5 },
            { name: 'SSD', attrKey: 'ssd', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'GB', isFilterable: true, isRequired: false, groupName: 'Lưu trữ', displayOrder: 1 },
            { name: 'HDD', attrKey: 'hdd', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'GB', isFilterable: true, isRequired: false, groupName: 'Lưu trữ', displayOrder: 2 },
            { name: 'eMMC', attrKey: 'emmc', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'GB', isFilterable: true, isRequired: false, groupName: 'Lưu trữ', displayOrder: 3 },
            { name: 'WiFi', attrKey: 'wifi', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 1 },
            { name: 'Bluetooth', attrKey: 'bluetooth', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 2 },
            { name: 'Cổng USB', attrKey: 'usb_ports', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 3 },
            { name: 'Cổng sạc', attrKey: 'charging_port', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 4 },
            { name: 'Hỗ trợ 5G', attrKey: 'support_5g', dataType: attribute_definition_schema_1.DataType.BOOLEAN, unit: null, isFilterable: true, isRequired: false, groupName: 'Kết nối', displayOrder: 5 },
            { name: 'NFC', attrKey: 'nfc', dataType: attribute_definition_schema_1.DataType.BOOLEAN, unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 6 },
            { name: 'Dung lượng pin', attrKey: 'battery_capacity', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'mAh', isFilterable: true, isRequired: false, groupName: 'Pin & Sạc', displayOrder: 1 },
            { name: 'Công suất sạc', attrKey: 'charging_watt', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'W', isFilterable: false, isRequired: false, groupName: 'Pin & Sạc', displayOrder: 2 },
            { name: 'Sạc không dây', attrKey: 'wireless_charging', dataType: attribute_definition_schema_1.DataType.BOOLEAN, unit: null, isFilterable: false, isRequired: false, groupName: 'Pin & Sạc', displayOrder: 3 },
            { name: 'Camera sau', attrKey: 'rear_camera', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'MP', isFilterable: false, isRequired: false, groupName: 'Camera', displayOrder: 1 },
            { name: 'Camera trước', attrKey: 'front_camera', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'MP', isFilterable: false, isRequired: false, groupName: 'Camera', displayOrder: 2 },
            { name: 'Số camera sau', attrKey: 'rear_cam_count', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'ống', isFilterable: false, isRequired: false, groupName: 'Camera', displayOrder: 3 },
            { name: 'Màu sắc', attrKey: 'color', dataType: attribute_definition_schema_1.DataType.LIST, unit: null, isFilterable: false, isRequired: false, groupName: 'Thiết kế', displayOrder: 1 },
            { name: 'Trọng lượng', attrKey: 'weight', dataType: attribute_definition_schema_1.DataType.NUMBER, unit: 'g', isFilterable: false, isRequired: false, groupName: 'Thiết kế', displayOrder: 2 },
            { name: 'Chất liệu', attrKey: 'material', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Thiết kế', displayOrder: 3 },
            { name: 'Hệ điều hành', attrKey: 'os', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Hệ điều hành', displayOrder: 1 },
            { name: 'Phiên bản OS', attrKey: 'os_version', dataType: attribute_definition_schema_1.DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Hệ điều hành', displayOrder: 2 },
        ];
        let created = 0;
        for (const d of defs) {
            const exists = await this.attrDefModel.findOne({ attrKey: d.attrKey });
            if (!exists) {
                const group = await getGroup(d.groupName);
                await this.attrDefModel.create({
                    name: d.name,
                    attrKey: d.attrKey,
                    dataType: d.dataType,
                    unit: d.unit,
                    isFilterable: d.isFilterable,
                    isRequired: d.isRequired,
                    displayOrder: d.displayOrder,
                    isActive: true,
                    attributeGroup: group?._id ?? null,
                });
                created++;
            }
        }
        if (created > 0) {
            this.logger.log(`✓ Seeded ${created} attribute definition(s)`);
        }
        else {
            this.logger.log('✓ Attribute definitions đã tồn tại, bỏ qua seed');
        }
    }
};
exports.DataSeedService = DataSeedService;
exports.DataSeedService = DataSeedService = DataSeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(attribute_group_schema_1.AttributeGroup.name)),
    __param(3, (0, mongoose_1.InjectModel)(attribute_definition_schema_1.AttributeDefinition.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DataSeedService);
//# sourceMappingURL=data-seed.service.js.map