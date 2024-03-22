import mongoose from "mongoose";
import { deviceStatus } from "../constants/device";
const Schema = mongoose.Schema;

const deviceSchema = new Schema(
  {
    orgID: { type: String, required: true, immutable: true },
    deviceID: { type: String, required: true, unique: true, immutable: true },
    deviceActive: { type: Boolean, default: true },
    deviceName: { type: String, required: true },
    deviceType: { type: String, required: true },
    deviceDescription: { type: String, default: "" },
    deviceStatus: { type: String, default: deviceStatus.AVAILABLE },
    deviceGroupID: { type: String, default: "" },
    deviceLocation: { type: String, default: "" },
    deviceMeta: { type: Object, default: {} },
    devicePhotoKey: { type: String, default: "" },
    purchasedDate: { type: String, default: "" },
    assignee: { type: String, default: "" },
    assignedOn: { type: String, default: null },
    assigner: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
exports.orgs = deviceSchema;
export default mongoose.model("devices", deviceSchema);
