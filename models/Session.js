import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const Session = new Schema({
  category: { type: String, required: true },
  category_other: { type: String },
  date_and_time: { type: Date, required: true },
  host: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "Account" }],
});

export default models.Session ?? model("Session", Session);
