// goal is to check if user is in the organization they're trying to access

import { UserRoles } from "../constants/user";
import { GetOrgAndUser } from "../services/OrgUserService";
import { IOrgUser } from "../types/org";

export const ValidateOrganizationPermission = async (
  req: any,
  res: any,
  next: any
) => {
  const orgID = req.params.orgID;
  const userID = req.userID;

  // check if user is in the organization
  const orgUser: any = await GetOrgAndUser(orgID, userID);
  if (!orgUser) {
    return res.status(404).send({ message: "Organization does not exist" });
  }
  console.log(orgUser)
  req.orgUser = orgUser;
  req.orgUserRole = orgUser.userRole;
  next();
};
export const ValidateOrganizationAdminPermission = async (
  req: any,
  res: any,
  next: any
) => {
  const role = req.orgUserRole;
  console.log(req.orgUserRole);
  if (role !== UserRoles.ADMIN && role !== UserRoles.SUPERADMIN) {
    return res
      .status(401)
      .send({ message: "You are not authorized to perform this action" });
  }
  next();
};
