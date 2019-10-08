import { Schema, model, Model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  place: String
});

export const UserModel = model("userCollection", UserSchema);
