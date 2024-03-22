import OrgModel from "../models/org";
import { ICreateOrg } from "../types/org";

export const GetAllUserOrganizations = async (userID: string) => {
  return await OrgModel.find({
    orgAdmins: {
      $elemMatch: { $eq: userID },
    },
  }).select("orgName orgID orgIndustry orgActive orgStatus orgProEnabled -_id");
};

export const CreateOrganization = async (org: ICreateOrg) => {
  return await OrgModel.create(org);
};

export const GetOrganization = async (orgID: string) => {
  return await OrgModel.findOne({ orgID }).select("-_id -__v -createdAt -updatedAt");
}

export const UpdateOrganization = async (orgID: string, org: ICreateOrg) => {
    return await OrgModel.updateOne({ orgID }, org);
}
