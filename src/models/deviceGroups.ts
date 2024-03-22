import mongoose from "mongoose";
const Schema = mongoose.Schema;

const deviceGroupsSchema = new Schema(
  {
    orgID: { type: String, required: true },
    groupID: { type: String, required: true },
    groupName: { type: String, default: "", required: true },
    groupDescription: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
exports.deviceGroups = deviceGroupsSchema;
export default mongoose.model("deviceGroups", deviceGroupsSchema);