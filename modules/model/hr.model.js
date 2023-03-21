const mongoose = require("mongoose");
const {hrSchema , attendanceSchema} = require("../schema/hr.schema");



const Hr = mongoose.model("hr", hrSchema);
const Attendance  = mongoose.model("Attendance " , attendanceSchema)
module.exports = {Hr , Attendance};
