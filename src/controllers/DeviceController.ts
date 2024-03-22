import {
  createOrgDevice,
  createOrgDeviceGroup,
  getDeviceByDeviceID,
  getOrgDeviceGroups,
  getOrgDevices,
  updateDeviceByDeviceID,
} from "../services/DeviceService";
import {
  GetDeviceLogs,
  LogDeviceChange,
  LogTypes,
} from "../services/LogService";
import { GetOrganization } from "../services/OrgService";
import { GetOrgUserByOrgUserID } from "../services/OrgUserService";
import { WrapHandler, WrapValidationHandler, generateID } from "../utils";
import { Request, Response } from "express";

export const Handler = WrapHandler(async (req: Request, res: Response) => {
  console.log(req.body);
  return res.status(200).send({ message: "Email Sent" });
});

export const GetOrgDeviceGroupsHandler = WrapValidationHandler(
  async (req: any, res: Response) => {
    const orgID = req.params.orgID;
    const org = await GetOrganization(orgID);
    if (!org)
      return res.status(404).send({ message: "Organization not found" });
    const deviceGroups = await getOrgDeviceGroups(orgID);
    return res.status(200).send({ deviceGroups });
  }
);
interface IAssigner {
  assignee?: any;
  assigner?: any;
}
export const GetDeviceHandler = WrapHandler(async (req: any, res: Response) => {
  const orgID = req.params.orgID;
  const org = await GetOrganization(orgID);
  if (!org) return res.status(404).send({ message: "Organization not found" });

  const deviceID = req.params.deviceID;
  const device = await getDeviceByDeviceID(deviceID);
  if (!device) return res.status(404).send({ message: "Device not found" });

  const assignee = device.assignee;
  const assigner = device.assigner;

  const assigns: IAssigner = {
    assignee: {},
    assigner: {},
  };

  if (assignee) {
    const getEmployee = await GetOrgUserByOrgUserID(assignee);
    if (getEmployee)
      assigns.assignee = {
        orgUserID: getEmployee.orgUserID,
        userNames: getEmployee.userNames,
        userEmail: getEmployee.userEmail,
      };
  }
  if (assigner) {
    const getEmployee = await GetOrgUserByOrgUserID(assigner);
    if (getEmployee)
      assigns.assigner = {
        orgUserID: getEmployee.orgUserID,
        userNames: getEmployee.userNames,
        userEmail: getEmployee.userEmail,
      };
  }

  const logs = (await GetDeviceLogs(deviceID)) || [];
  return res.status(200).send({ device, logs, assigns });
});
export const CreateOrgDeviceGroupsHandler = WrapValidationHandler(
  async (req: any, res: Response) => {
    const orgID = req.params.orgID;
    const org = await GetOrganization(orgID);
    if (!org)
      return res.status(404).send({ message: "Organization not found" });
    const { groupName, groupDescription } = req.body;
    // return res.status(200).send({ deviceGroups });
    const deviceGroup = {
      groupName,
      groupDescription,
      orgID,
      groupID: generateID("deviceGroup-"),
    };
    const createGroup = await createOrgDeviceGroup(deviceGroup);
    if (!createGroup)
      return res.status(400).send({ message: "Error creating device group" });
    return res
      .status(200)
      .send({ message: "Device group created", data: deviceGroup });
  }
);

export const AddDeviceHandler = WrapValidationHandler(
  async (req: any, res: Response) => {
    const orgID = req.params.orgID;
    const org = await GetOrganization(orgID);
    if (!org)
      return res.status(404).send({ message: "Organization not found" });
    const payload = req.body;

    payload.deviceID = generateID("device-");
    payload.orgID = orgID;
    if (payload.assignee) {
      payload.assigner = req.userID;
      payload.assignedAt = new Date();
    }
    const createDevice = await createOrgDevice(payload);
    if (!createDevice)
      return res.status(400).send({ message: "Error creating device" });
    await LogDeviceChange(
      LogTypes.CREATED.type,
      payload.deviceID,
      LogTypes.CREATED.description
    );
    return res.status(200).send({ message: "Device created", data: payload });
  }
);
export const GetAllOrgDevicesHandler = WrapValidationHandler(
  async (req: any, res: Response) => {
    const query = req.query;
    const orgID = req.params.orgID;
    const org = await GetOrganization(orgID);
    if (!org)
      return res.status(404).send({ message: "Organization not found" });
    const devices = await getOrgDevices(orgID, query);
    return res.status(200).send({ devices });
  }
);
export const UpdateOrgDevicesHandler = WrapValidationHandler(
  async (req: any, res: Response) => {
    const orgID = req.params.orgID;
    const org = await GetOrganization(orgID);
    if (!org)
      return res.status(404).send({ message: "Organization not found" });
    const deviceID = req.params.deviceID;
    const update = req.body;
    const device = await getDeviceByDeviceID(deviceID);
    if (!device) return res.status(404).send({ message: "Device not found" });
    // PERForm the update
    if (update.assignee) {
      const getEmployee = await GetOrgUserByOrgUserID(update.assignee);
      if (!getEmployee)
        return res.status(404).send({ message: "Employee not found" });
      update.assigner = req.userID;
      update.userName = getEmployee.userNames;
      update.assignedAt = new Date();
    }
    const updated = await updateDeviceByDeviceID(deviceID, update);
    if (!updated)
      return res.status(400).send({ message: "Error updating device" });
    await LogDeviceChange(LogTypes.CHANGELOG.type, deviceID, device);
    if (update.assignee) {
      await LogDeviceChange(
        LogTypes.ASSIGNED.type,
        deviceID,
        "Device assigned to " + update.userName
      );
    }
    return res.status(200).send({ message: "Device updated", data: update });
  }
);
