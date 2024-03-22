import mongoose from "mongoose";
import { UserRoles, UserStatus } from "../constants/user";
const Schema = mongoose.Schema;

const orgUsersSchema = new Schema(
  {
    orgID: { type: String, required: true, immutable: true },
    userID: { type: String, required: true, immutable: true },
    userNames: { type: String, required: true },
    orgUserID: { type: String, required: true, immutable: true },
    userEmail: { type: String, required: true },
    userActive: { type: Boolean, default: true },
    userRole: { type: String, default: UserRoles.USER },
    userStatus: { type: String, default: UserStatus.UNREGISTERED },
    userEnabled: { type: Boolean, default: false },
    userMeta: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
);
exports.orgUsers = orgUsersSchema;
export default mongoose.model("orgUsers", orgUsersSchema);