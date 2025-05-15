import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
    AllowNull,
    Default,
    BelongsTo,
    ForeignKey,
    HasMany,
    BelongsToMany
} from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    declare email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare password: string;

    @Default('USER')
    @AllowNull(false)
    @Column(DataType.STRING)
    declare role: string;
}

@Table({ tableName: 'devices' })
export class Device extends Model<Device> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare price: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare img: string;

    @ForeignKey(() => Type)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare typeId: number;

    @BelongsTo(() => Type)
    declare type: Type;

    @ForeignKey(() => Brand)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare brandId: number;

    @BelongsTo(() => Brand)
    declare brand: Brand;

    @HasMany(() => DeviceInfo)
    declare info: DeviceInfo[];
}

@Table({ tableName: 'types' })
export class Type extends Model<Type> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Device)
    declare devices: Device[];

    @BelongsToMany(() => Brand, () => TypeBrand)
    declare brands: Brand[];
}

@Table({ tableName: 'brands' })
export class Brand extends Model<Brand> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    declare name: string;

    @HasMany(() => Device)
    declare devices: Device[];

    @BelongsToMany(() => Type, () => TypeBrand)
    declare types: Type[];
}

@Table({ tableName: 'device_infos' })
export class DeviceInfo extends Model<DeviceInfo> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare title: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare description: string;

    @ForeignKey(() => Device)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare deviceId: number;

    @BelongsTo(() => Device)
    declare device: Device;
}

@Table({ tableName: 'type_brands' })
export class TypeBrand extends Model<TypeBrand> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => Type)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare typeId: number;

    @ForeignKey(() => Brand)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare brandId: number;
}