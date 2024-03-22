import mongoose from "mongoose";
import { deviceLogTypes, deviceStatus } from "../constants/device";
const Schema = mongoose.Schema;

const deviceLogSchema = new Schema(
  {
    deviceID: { type: String, required: true, immutable: true },
    logID: { type: String, required: true, unique: true, immutable: true },
    logType: { type: String, required: true, default: deviceLogTypes.STATUS },
    logDescription: { type: String, default: "" },
    logMeta: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
);
exports.orgs = deviceLogSchema;
export default mongoose.model("deviceLogs", deviceLogSchema);
