import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orgSchema = new Schema(
  {
    orgName: { type: String, required: true },
    orgIndustry: { type: String, required: true },
    orgID: { type: String, required: true, unique: true, immutable: true },
    orgActive: { type: Boolean, default: true },
    orgStatus: { type: String, default: "active" },
    orgProEnabled: { type: Boolean, default: false },
    orgAdmins: { type: Array, default: [] },
    orgMeta: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
);
exports.orgs = orgSchema;
export default mongoose.model("orgs", orgSchema);