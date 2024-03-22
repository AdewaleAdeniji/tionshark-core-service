import { Router } from "express";
import { AddDeviceHandler, CreateOrgDeviceGroupsHandler, GetAllOrgDevicesHandler, GetDeviceHandler, GetOrgDeviceGroupsHandler, UpdateOrgDevicesHandler } from "../controllers/DeviceController";
import { addDeviceValidator, deviceGroupValidator } from "../validators/device";
import { ValidateOrganizationAdminPermission, ValidateOrganizationPermission } from "../middlewares/orgServiceMiddleware";

const deviceRouter = Router();

deviceRouter.get("/", (req, res) => {
  return res.status(200).send({ message: "Devices Service up" });
});
deviceRouter.get("/:orgID/groups", [
  ValidateOrganizationPermission,
  ValidateOrganizationAdminPermission,
], GetOrgDeviceGroupsHandler)

deviceRouter.post("/:orgID/groups", deviceGroupValidator, [
  ValidateOrganizationPermission,
  ValidateOrganizationAdminPermission,
], CreateOrgDeviceGroupsHandler)

deviceRouter.post("/:orgID/new", addDeviceValidator, [
  ValidateOrganizationPermission,
  ValidateOrganizationAdminPermission,
], AddDeviceHandler)

deviceRouter.post("/:orgID/device/:deviceID", addDeviceValidator, [
  ValidateOrganizationPermission,
  ValidateOrganizationAdminPermission,
], UpdateOrgDevicesHandler)

deviceRouter.get("/:orgID/all", [
  ValidateOrganizationPermission,
  ValidateOrganizationAdminPermission,
], GetAllOrgDevicesHandler)

deviceRouter.get("/:orgID/device/:deviceID", [
  ValidateOrganizationPermission,
  ValidateOrganizationAdminPermission,
], GetDeviceHandler)

deviceRouter.post("/new", (req, res) => {
  return res.status(200).send({ message: "Devices Service up" });
});

export default deviceRouter;