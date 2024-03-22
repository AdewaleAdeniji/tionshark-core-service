import deviceLog from "../models/deviceLog";
import { generateID } from "../utils";

export const LogDeviceChange = async (
  logType: string,
  deviceID: string,
  logChange: any
) => {
  //console.log(logType, deviceID, logChange);
  await deviceLog.create({
    deviceID,
    logID: generateID("log-"),
    logType,
    logDescription: logChange,
  });
};
export const GetDeviceLogs = async (deviceID: string) => {
  return await deviceLog.find({ deviceID });
}
export const LogTypes = {
  CHANGELOG: {
    type: "CHANGELOG",
    description: "Change in device data",
  },
  CREATED: {
    type: "CREATED",
    description: "Device created",
  },
  ASSIGNED: {
    type: "ASSIGNED",
    description: "Assigned to a user",
  },
  DELETED: {
    type: "DELETED",
    description: "Device deleted",
  },
  MAINTENANCE: {
    type: "MAINTENANCE",
    description: "Device sent for maintenance",
  },
};
