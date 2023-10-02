import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pinned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
    },
  ],
});

export const User = mongoose.model("users", UserSchema);
