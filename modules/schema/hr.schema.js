const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const hrSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true },
        password: { type: String },
        // group:{type: String },
        role: { type: String },
        isDEleted : {type:Boolean , default: false},
        
    },
    {
        timestamps: true,
    }
);

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hr',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  isPresent: {
    type: Boolean,
    default: false
  },

});



hrSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
  });

module.exports = {hrSchema , attendanceSchema};