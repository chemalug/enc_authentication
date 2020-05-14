const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = School = mongoose.model("enc_school", SchoolSchema);
