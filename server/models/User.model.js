const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
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
    
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Bar' }],

    },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

