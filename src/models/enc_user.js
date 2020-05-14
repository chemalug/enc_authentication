const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    rol: {
      type: String,
      required: true,
    },
    recoveryCode: {
      type: String,
      trim: true,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },

    created: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = User = mongoose.model("enc_users", UserSchema);
