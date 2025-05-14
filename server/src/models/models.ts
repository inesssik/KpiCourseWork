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
    HasOne,
    BelongsTo,
    ForeignKey,
    HasMany,
    BelongsToMany
} from 'sequelize-typescript';
import {
    HasOneCreateAssociationMixin,
    // HasManyAddAssociationMixin,
    // HasManyGetAssociationsMixin,
    BelongsToCreateAssociationMixin
} from 'sequelize';

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

    // Association mixins for User -> Basket
    declare createBasket: HasOneCreateAssociationMixin<Basket>;
    declare getBasket: HasOneCreateAssociationMixin<Basket>;

    @HasOne(() => Basket)
    declare basket: Basket;

    @HasMany(() => Rating)
    declare ratings: Rating[];
}

@Table({ tableName: 'baskets' })
export class Basket extends Model<Basket> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare userId: number;

    // Association mixins for Basket -> User
    declare createUser: BelongsToCreateAssociationMixin<User>;
    declare getUser: BelongsToCreateAssociationMixin<User>;

    @BelongsTo(() => User)
    declare user: User;

    @HasMany(() => BasketDevice)
    declare basketDevices: BasketDevice[];
}

@Table({ tableName: 'basket_devices' })
export class BasketDevice extends Model<BasketDevice> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @ForeignKey(() => Basket)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare basketId: number;

    @BelongsTo(() => Basket)
    declare basket: Basket;

    @ForeignKey(() => Device)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare deviceId: number;

    @BelongsTo(() => Device)
    declare device: Device;
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

    @Default(0)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare rating: number;

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

    @HasMany(() => BasketDevice)
    declare basketDevices: BasketDevice[];
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

@Table({ tableName: 'ratings' })
export class Rating extends Model<Rating> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare rate: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;
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