import { getUniqueId,getDeviceName,getDeviceId,getSystemVersion,getSystemName,getModel,getBrand,isEmulator,getManufacturer } from 'react-native-device-info';

export async function checkDevice(){
    return true
}



export function deviceDetail(){
    const deviceDetail = {
        IsDevice: true,
        uniqueID: getUniqueId(),
        Brand: getBrand(),
        Manufacture: '',
        ModelName: getModel(),
        ModelId: getDeviceId(),
        OS: getSystemName(),
        OSVersion: getSystemVersion(),
        DeviceName: ''
    }

    return deviceDetail
}