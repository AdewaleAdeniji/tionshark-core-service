import { Request, Response } from "express";
import { WrapHandler, WrapValidationHandler, generateID } from "../utils";
import { ICreateOrg } from "../types/org";
import {
  CreateOrganization,
  GetAllUserOrganizations,
  GetOrganization,
} from "../services/OrgService";
import { UserRoles, UserStatus } from "../constants/user";
import {
  CreateOrgUser,
  GetOrgUserByEmailAddress,
  GetOrgUserByOrgID,
  GetOrgUserByOrgUserID,
  GetOrgUserByUserID,
  UpdateOrgUser,
} from "../services/OrgUserService";

export const Handler = WrapHandler(async (req: Request, res: Response) => {
  //   console.log(req.body);
  return res.status(200).send({ message: "Email Sent" });
});

export const GetUserOrganizations = WrapHandler(
  async (req: any, res: Response) => {
    const userID = req.userID;
    const userOrgs = await GetAllUserOrganizations(userID);
    return res.status(200).send({ organizations: userOrgs });
  }
);

export const UpdateOrgUserHandler = WrapHandler(
  async (req: any, res: Response) => {
    const update = req.body;
    //   const userOrgs = await GetAllUserOrganizations(userID);
    const orgUser = await GetOrgUserByOrgUserID(req.params.orgUserID);
    if (!orgUser)
      return res.status(404).send({ message: "Org User not found" });
    delete update.orgUserID;
    delete update.userMeta;
    delete update.userID;
    delete update.orgID;

    const orgUserUpdate = {
      ...orgUser,
      ...update,
    };
    const updated = await UpdateOrgUser(req.params.orgUserID, orgUserUpdate);
    if (!updated)
      return res.status(400).send({ message: "Error updating user" });
    return res
      .status(200)
      .send({ message: "User updated", data: update });
  }
);

export const GetOrganizationHandler = WrapHandler(
  async (req: any, res: Response) => {
    const orgID = req.params.orgID;
    const org = await GetOrganization(orgID);
    if (!org)
      return res.status(404).send({ message: "Organization not found" });
    var orgAdmins = org.orgAdmins;
    const admins = await Promise.all(
      orgAdmins.map(async (adminID) => {
        const user = await GetOrgUserByUserID(adminID);
        if (!user) return;
        return {
          userID: user.userID,
          userEmail: user.userEmail,
          userNames: user.userNames,
        };
      })
    );
    return res.status(200).send({ organization: org, admins });
  }
);
export const GetOrganizationDetailsHandler = WrapHandler(
  async (req: any, res: Response) => {
    const orgID = req.params.orgID;
    const org = await GetOrganization(orgID);
    if (!org)
      return res.status(404).send({ message: "Organization not found" });
    var orgAdmins = org.orgAdmins;
    const admins = await Promise.all(
      orgAdmins.map(async (adminID) => {
        const user = await GetOrgUserByUserID(adminID);
        if (!user) return;
        return {
          userID: user.userID,
          userEmail: user.userEmail,
          userNames: user.userNames,
        };
      })
    );
    var employees = await GetOrgUserByOrgID(orgID, "-_id -__v");
    return res.status(200).send({ organization: org, admins, employees });
  }
);
export const AddOrganizationUserHandler = WrapValidationHandler(
  async (req: any, res: Response) => {
    const orgUser = {
      userID: generateID("orgUserDefault"),
      orgUserID: generateID("orgUser"),
      userRole: UserRoles.USER,
      userEmail: req.body.userEmail,
      orgID: req.params.orgID,
      userStatus: UserStatus.UNREGISTERED,
      userNames: "default",
    };
    // check if userID and orgID exist
    const checkUser = await GetOrgUserByEmailAddress(
      orgUser.orgID,
      orgUser.userEmail
    );
    if (checkUser)
      return res.status(400).send({ message: "User already added" });
    const addUser = await CreateOrgUser(orgUser);
    if (!addUser)
      return res
        .status(400)
        .send({ message: "Error adding user to organization" });
    return res.send({
      message: "User added to organization",
      data: orgUser,
    });
  }
);

export const CreateOrganizationHandler = WrapValidationHandler(
  async (req: any, res: Response) => {
    const organization: ICreateOrg = req.body;

    organization.orgID = generateID("org");
    organization.orgAdmins = [req.userID];
    const createOrg = await CreateOrganization(organization);
    if (!createOrg)
      return res.status(400).send({ message: "Error creating organization" });

    // add user to orgUsers
    const orgUser = {
      userID: req.userID,
      orgUserID: generateID("orgUser"),
      userRole: UserRoles.ADMIN,
      userEmail: req.user.email,
      orgID: organization.orgID,
      userStatus: UserStatus.ACTIVE,
      userNames: req.user.firstName + " " + req.user.lastName,
    };
    const addUser = await CreateOrgUser(orgUser);
    if (!addUser)
      return res
        .status(400)
        .send({ message: "Error adding user to organization" });
    return res
      .status(200)
      .send({ message: "Organization created", data: organization });
  }
);
