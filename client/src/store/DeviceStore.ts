import { observable, action, computed, makeObservable } from 'mobx';

export interface IType { id?: number; name: string }
export interface IBrand { id?: number; name: string }
export interface IDevice { id?: number; name: string, img: string, price: number, info: IInfo[], typeId: number, brandId: number }
export interface IInfo {id?: string, title: string, description: string, number: number }

export default class DeviceStore {
    @observable private _types: IType[] = [
        { id: 1, name: 'Холодильник' },
        { id: 2, name: 'Смартфоны' }
    ];
    @observable private _brands: IBrand[] = [
        { id: 1, name: 'Samsung' },
        { id: 2, name: 'Apple' }
    ];
    @observable private _devices: IDevice[] = [];
    @observable private _selectedType: IType = {} as IType;
    @observable private _selectedBrand: IBrand = {} as IBrand;
    @observable private _selectedDevice: IDevice = {} as IDevice;
    @observable private _page: number = 1;
    @observable private _totalCount: number = 0;
    @observable private _limit: number = 3;

    constructor() {
        makeObservable(this);
    }

    @action public setTypes(types: IType[]) {
        this._types = types;
    }

    @action public setBrands(brands: IBrand[]) {
        this._brands = brands;
    }

    @action public setDevices(devices: IDevice[]) {
        this._devices = devices;
    }

    @action public setSelectedType(type: IType) {
        this.setPage(1);
        this._selectedType = type;
    }

    @action public setSelectedBrand(brand: IBrand) {
        this.setPage(1);
        this._selectedBrand = brand;
    }

    @action public setSelectedDevice(device: IDevice) {
        this.setPage(1);
        this._selectedDevice = device;
    }

    @action public setPage(page: number) {
        this._page = page;
    }

    @action public setTotalCount(count: number) {
        this._totalCount = count;
    }

    @computed public get types(): IType[] {
        return this._types;
    }

    @computed public get brands(): IBrand[] {
        return this._brands;
    }

    @computed public get devices(): IDevice[] {
        return this._devices;
    }

    @computed public get selectedType(): IType {
        return this._selectedType;
    }

    @computed public get selectedBrand(): IBrand {
        return this._selectedBrand;
    }

    @computed public get selectedDevice(): IDevice {
        return this._selectedDevice;
    }

    @computed public get page(): number {
        return this._page;
    }

    @computed public get totalCount(): number {
        return this._totalCount;
    }

    @computed public get limit(): number {
        return this._limit;
    }
}
