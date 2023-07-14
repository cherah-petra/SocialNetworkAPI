const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Enter a valid email address.",
      ],
    },
    thoughts: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "thought",
    },
    friends: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
