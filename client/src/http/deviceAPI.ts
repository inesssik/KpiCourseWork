import { IBrand, IDevice, IType } from "../store/DeviceStore";
import { $authHost, $host } from "./index";

export const createType = async (type: IType) => {
    const { data } = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type')
    return data
}

export const createBrand = async (brand: IBrand) => {
    const { data } = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const { data } = await $host.get('api/brand',)
    return data
}

export const createDevice = async (device: FormData) => {
    const { data } = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId: number | string | null, brandId: number | string | null, page: number, limit: number = 5) => {
    const { data } = await $host.get('api/device', {
        params: {
            typeId, brandId, page, limit
        }
    })
    return data
}

export const fetchOneDevice = async (id: number) => {
    const { data } = await $host.get('api/device/' + id)
    return data
}