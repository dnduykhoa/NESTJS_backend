import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role, RoleDocument } from '../roles/schemas/role.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  AttributeGroup,
  AttributeGroupDocument,
} from '../attributes/schemas/attribute-group.schema';
import {
  AttributeDefinition,
  AttributeDefinitionDocument,
  DataType,
} from '../attributes/schemas/attribute-definition.schema';

@Injectable()
export class DataSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DataSeedService.name);

  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(AttributeGroup.name) private readonly attrGroupModel: Model<AttributeGroupDocument>,
    @InjectModel(AttributeDefinition.name) private readonly attrDefModel: Model<AttributeDefinitionDocument>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedRoles();
    await this.seedAdminUser();
    await this.seedAttributeGroups();
    await this.seedAttributeDefinitions();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 1. ROLES
  // ─────────────────────────────────────────────────────────────────────────
  private async seedRoles() {
    const roles = [
      { name: 'ADMIN',   description: 'Quản trị viên - Có toàn quyền quản lý hệ thống' },
      { name: 'MANAGER', description: 'Quản lý - Quản lý sản phẩm, đơn hàng và nhân viên' },
      { name: 'STAFF',   description: 'Nhân viên - Xử lý đơn hàng và hỗ trợ khách hàng' },
      { name: 'USER',    description: 'Người dùng - Khách hàng thông thường' },
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
    } else {
      this.logger.log('✓ Roles đã tồn tại, bỏ qua seed');
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ADMIN USER
  // ─────────────────────────────────────────────────────────────────────────
  private async seedAdminUser() {
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
      username:  'admin',
      password:  hashed,
      email:     'admin@techstore.com',
      fullName:  'Quản trị viên hệ thống',
      phone:     '0999999999',
      provider:  'local',
      role:      adminRole._id,
    });

    this.logger.log('✓ Tạo tài khoản admin — username: admin | password: Admin@12345');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. ATTRIBUTE GROUPS
  // ─────────────────────────────────────────────────────────────────────────
  private async seedAttributeGroups() {
    const groups = [
      { name: 'Hiệu năng',     description: 'CPU, RAM, bộ nhớ trong, card đồ họa...',             displayOrder: 1 },
      { name: 'Màn hình',      description: 'Kích thước, độ phân giải, tần số quét, tấm nền...',  displayOrder: 2 },
      { name: 'Lưu trữ',       description: 'SSD, HDD, eMMC, dung lượng lưu trữ...',              displayOrder: 3 },
      { name: 'Kết nối',       description: 'WiFi, Bluetooth, USB, HDMI, cổng sạc...',            displayOrder: 4 },
      { name: 'Pin & Sạc',     description: 'Dung lượng pin, công suất sạc, thời lượng pin...',   displayOrder: 5 },
      { name: 'Camera',        description: 'Độ phân giải camera sau, trước, số lượng camera...',  displayOrder: 6 },
      { name: 'Thiết kế',      description: 'Kích thước, trọng lượng, màu sắc, chất liệu...',     displayOrder: 7 },
      { name: 'Hệ điều hành',  description: 'Hệ điều hành, phiên bản...',                         displayOrder: 8 },
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
    } else {
      this.logger.log('✓ Attribute groups đã tồn tại, bỏ qua seed');
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ATTRIBUTE DEFINITIONS
  // ─────────────────────────────────────────────────────────────────────────
  private async seedAttributeDefinitions() {
    const getGroup = async (name: string) =>
      this.attrGroupModel.findOne({ name });

    const defs: Array<{
      name: string; attrKey: string; dataType: DataType;
      unit: string | null; isFilterable: boolean; isRequired: boolean;
      groupName: string; displayOrder: number;
    }> = [
      // Hiệu năng
      { name: 'CPU',            attrKey: 'cpu',            dataType: DataType.STRING,  unit: null,   isFilterable: false, isRequired: true,  groupName: 'Hiệu năng',    displayOrder: 1 },
      { name: 'RAM',            attrKey: 'ram',            dataType: DataType.NUMBER,  unit: 'GB',   isFilterable: true,  isRequired: true,  groupName: 'Hiệu năng',    displayOrder: 2 },
      { name: 'Card đồ họa',   attrKey: 'gpu',            dataType: DataType.STRING,  unit: null,   isFilterable: false, isRequired: false, groupName: 'Hiệu năng',    displayOrder: 3 },
      { name: 'Tốc độ CPU',    attrKey: 'cpu_speed',      dataType: DataType.NUMBER,  unit: 'GHz',  isFilterable: true,  isRequired: false, groupName: 'Hiệu năng',    displayOrder: 4 },
      { name: 'Số nhân CPU',   attrKey: 'cpu_cores',      dataType: DataType.NUMBER,  unit: 'nhân', isFilterable: true,  isRequired: false, groupName: 'Hiệu năng',    displayOrder: 5 },
      // Màn hình
      { name: 'Kích thước màn hình', attrKey: 'screen_size',       dataType: DataType.NUMBER, unit: 'inch', isFilterable: true,  isRequired: false, groupName: 'Màn hình', displayOrder: 1 },
      { name: 'Độ phân giải',        attrKey: 'screen_resolution', dataType: DataType.STRING, unit: null,   isFilterable: false, isRequired: false, groupName: 'Màn hình', displayOrder: 2 },
      { name: 'Tần số quét',         attrKey: 'refresh_rate',      dataType: DataType.NUMBER, unit: 'Hz',   isFilterable: true,  isRequired: false, groupName: 'Màn hình', displayOrder: 3 },
      { name: 'Công nghệ tấm nền',  attrKey: 'panel_type',        dataType: DataType.STRING, unit: null,   isFilterable: false, isRequired: false, groupName: 'Màn hình', displayOrder: 4 },
      { name: 'Độ sáng tối đa',     attrKey: 'brightness',        dataType: DataType.NUMBER, unit: 'nits', isFilterable: false, isRequired: false, groupName: 'Màn hình', displayOrder: 5 },
      // Lưu trữ
      { name: 'SSD',  attrKey: 'ssd',  dataType: DataType.NUMBER, unit: 'GB', isFilterable: true,  isRequired: false, groupName: 'Lưu trữ', displayOrder: 1 },
      { name: 'HDD',  attrKey: 'hdd',  dataType: DataType.NUMBER, unit: 'GB', isFilterable: true,  isRequired: false, groupName: 'Lưu trữ', displayOrder: 2 },
      { name: 'eMMC', attrKey: 'emmc', dataType: DataType.NUMBER, unit: 'GB', isFilterable: true,  isRequired: false, groupName: 'Lưu trữ', displayOrder: 3 },
      // Kết nối
      { name: 'WiFi',       attrKey: 'wifi',         dataType: DataType.STRING,  unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 1 },
      { name: 'Bluetooth',  attrKey: 'bluetooth',    dataType: DataType.STRING,  unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 2 },
      { name: 'Cổng USB',   attrKey: 'usb_ports',    dataType: DataType.STRING,  unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 3 },
      { name: 'Cổng sạc',   attrKey: 'charging_port',dataType: DataType.STRING,  unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 4 },
      { name: 'Hỗ trợ 5G',  attrKey: 'support_5g',   dataType: DataType.BOOLEAN, unit: null, isFilterable: true,  isRequired: false, groupName: 'Kết nối', displayOrder: 5 },
      { name: 'NFC',         attrKey: 'nfc',          dataType: DataType.BOOLEAN, unit: null, isFilterable: false, isRequired: false, groupName: 'Kết nối', displayOrder: 6 },
      // Pin & Sạc
      { name: 'Dung lượng pin',  attrKey: 'battery_capacity',   dataType: DataType.NUMBER,  unit: 'mAh', isFilterable: true,  isRequired: false, groupName: 'Pin & Sạc', displayOrder: 1 },
      { name: 'Công suất sạc',   attrKey: 'charging_watt',      dataType: DataType.NUMBER,  unit: 'W',   isFilterable: false, isRequired: false, groupName: 'Pin & Sạc', displayOrder: 2 },
      { name: 'Sạc không dây',   attrKey: 'wireless_charging',  dataType: DataType.BOOLEAN, unit: null,  isFilterable: false, isRequired: false, groupName: 'Pin & Sạc', displayOrder: 3 },
      // Camera
      { name: 'Camera sau',    attrKey: 'rear_camera',   dataType: DataType.NUMBER, unit: 'MP',   isFilterable: false, isRequired: false, groupName: 'Camera', displayOrder: 1 },
      { name: 'Camera trước',  attrKey: 'front_camera',  dataType: DataType.NUMBER, unit: 'MP',   isFilterable: false, isRequired: false, groupName: 'Camera', displayOrder: 2 },
      { name: 'Số camera sau', attrKey: 'rear_cam_count',dataType: DataType.NUMBER, unit: 'ống',  isFilterable: false, isRequired: false, groupName: 'Camera', displayOrder: 3 },
      // Thiết kế
      { name: 'Màu sắc',    attrKey: 'color',    dataType: DataType.LIST,   unit: null, isFilterable: false, isRequired: false, groupName: 'Thiết kế', displayOrder: 1 },
      { name: 'Trọng lượng',attrKey: 'weight',   dataType: DataType.NUMBER, unit: 'g',  isFilterable: false, isRequired: false, groupName: 'Thiết kế', displayOrder: 2 },
      { name: 'Chất liệu',  attrKey: 'material', dataType: DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Thiết kế', displayOrder: 3 },
      // Hệ điều hành
      { name: 'Hệ điều hành', attrKey: 'os',         dataType: DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Hệ điều hành', displayOrder: 1 },
      { name: 'Phiên bản OS', attrKey: 'os_version',  dataType: DataType.STRING, unit: null, isFilterable: false, isRequired: false, groupName: 'Hệ điều hành', displayOrder: 2 },
    ];

    let created = 0;
    for (const d of defs) {
      const exists = await this.attrDefModel.findOne({ attrKey: d.attrKey });
      if (!exists) {
        const group = await getGroup(d.groupName);
        await this.attrDefModel.create({
          name:           d.name,
          attrKey:        d.attrKey,
          dataType:       d.dataType,
          unit:           d.unit,
          isFilterable:   d.isFilterable,
          isRequired:     d.isRequired,
          displayOrder:   d.displayOrder,
          isActive:       true,
          attributeGroup: group?._id ?? null,
        });
        created++;
      }
    }

    if (created > 0) {
      this.logger.log(`✓ Seeded ${created} attribute definition(s)`);
    } else {
      this.logger.log('✓ Attribute definitions đã tồn tại, bỏ qua seed');
    }
  }
}
