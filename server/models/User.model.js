const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,

    },

    role: {
      type: String,
      default: 'USER',
      enum: ['USER', 'ADMIN'],
    },

    email: {
      type: String,
      unique: true,
      required: true,

    },

    password: {
      type: String,
      required: true,
      // minlength: 5,
    },

    image: {
      type: String,
    },

    // favorites: {
    //   type: { Object_id },
    // }
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

//to do: user_id
