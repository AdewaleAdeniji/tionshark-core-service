import deviceModel from "../models/device";
import deviceGroups from "../models/deviceGroups";


export const getOrgDeviceGroups = async (orgID: string) => {
    return await deviceGroups.find({ orgID });
}
export const createOrgDeviceGroup = async (orgData: any) => {
    return await deviceGroups.create(orgData);
} 
export const createOrgDevice = async (device: any) => {
    return await deviceModel.create(device);
}
export const getOrgDevices = async (orgID: string, query: any) => {
    return await deviceModel.find({ orgID, ...query });
}
export const getDeviceByDeviceID = async (deviceID: string) => {
    return await deviceModel.findOne({ deviceID });
}
export const updateDeviceByDeviceID = async (deviceID: string, update: any) => {
    return await deviceModel.findOneAndUpdate({ deviceID }, update);
}