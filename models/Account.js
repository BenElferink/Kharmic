// import autoPopulate from "mongoose-autopopulate";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const Account = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      default: "Anonymous",
    },
    karma: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
// .plugin(autoPopulate);

export default models.Account ?? model("Account", Account);
