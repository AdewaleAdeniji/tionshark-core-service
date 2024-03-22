import { IOrgUser } from "../types/org";
import OrgUserModel from "../models/orgUsers";

export const CreateOrgUser = async (orgUser: IOrgUser) => {
  return await OrgUserModel.create(orgUser);
};
export const GetOrgUserByOrgUserID = async (orgUserID: string): Promise<any> => {
  const user =  await OrgUserModel.find({
    orgUserID,
  });
  //console.log(user)
  return user ? user[0] : null
};
export const GetOrgUserByUserID = async (userID: string) => {
  return await OrgUserModel.findOne({ userID });
};
export const GetOrgUserByEmailAddress = async (
  orgID: string,
  userEmail: string
) => {
  return await OrgUserModel.findOne({ userEmail, orgID });
};
export const GetOrgAndUser = async (orgID: string, userID: string) => {
  return await OrgUserModel.findOne({ orgID, userID });
};
export const UpdateOrgUser = async (orgUserID: string, orgUser: IOrgUser) => {
  return await OrgUserModel.findOneAndUpdate({ orgUserID }, orgUser);
};
export const GetOrgUserByOrgID = async (orgID: string, selected: string) => {
    return await OrgUserModel.find({ orgID }).select(selected);
    }