import { Router } from "express";
import {
  AddOrganizationUserHandler,
  CreateOrganizationHandler,
  GetOrganizationDetailsHandler,
  GetOrganizationHandler,
  GetUserOrganizations,
  UpdateOrgUserHandler,
} from "../controllers/OrgController";
import { addUserOrgValidator, createOrgValidator } from "../validators/org";
import {
  ValidateOrganizationAdminPermission,
  ValidateOrganizationPermission,
} from "../middlewares/orgServiceMiddleware";
import { ValidateUserToken } from "../middlewares/userServiceMiddleware";

const orgRouter = Router();

orgRouter.get("/", (req, res) => {
  return res.status(200).send({ message: "Org Service up" });
});
orgRouter.post("/new", createOrgValidator, CreateOrganizationHandler);
orgRouter.get("/all", GetUserOrganizations);
orgRouter.get(
  "/:orgID",
  [ValidateUserToken, ValidateOrganizationPermission],
  GetOrganizationHandler
);
orgRouter.get(
  "/details/:orgID",
  [ValidateUserToken, ValidateOrganizationPermission],
  GetOrganizationDetailsHandler
);
orgRouter.post(
  "/:orgID/users/new",
  addUserOrgValidator,
  [
    ValidateUserToken,
    ValidateOrganizationPermission,
    ValidateOrganizationAdminPermission,
  ],
  AddOrganizationUserHandler
);

orgRouter.put(
  "/:orgID/users/:orgUserID",
  addUserOrgValidator,
  [
    ValidateUserToken,
    ValidateOrganizationPermission,
    ValidateOrganizationAdminPermission,
  ],
  UpdateOrgUserHandler
);

export default orgRouter;
