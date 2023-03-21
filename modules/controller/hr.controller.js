const {Hr , Attendance} = require("../model/hr.model");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const signUp = async (req, res) => {
  const { name, group, email, password, role } = req.body;
  try {
    const hr = await Hr.findOne({ email });
    if (!hr) {
      const newHr = new Hr({ name, group, email, password, role });
      await newHr.save();
      res.status(StatusCodes.CREATED).json({ message: "signup is created" });
    } else {
      res.json({ message: "email is already exist" });
    }
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "error in signUp" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hr = await Hr.findOne({ email });
    if (!hr) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "email not found" });
    } else {
      // check 3al password
      try {
        const match = await bcrypt.compare(password, hr.password);
        if (match) {
          let token = jwt.sign({ _id: hr._id, role: hr.role }, "shhhhh");
          res.status(StatusCodes.OK).json({
            message: "LogIn success",
            token,
            data: {
              id: hr._id,
              email: hr.email,
            },
          });
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "incorrect password" });
        }
      } catch (error) {
        res.json({ message: "error", error });
      }
    }
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const updateHr = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  try {
    const hr = await Hr.updateOne({ _id: id }, { name: name });
    res.json({ message: "updated success", hr });
  } catch (error) {
    res.json({ message: "updated error" });
  }
};

const deleteHr = async (req, res) => {
  const { id } = req.params;
  try {
    await Hr.updateOne({ id }, { isDeleted: true });
    res.json({ message: "deleted success" });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const addAttendance = async(req,res)=>{
  const { employeeId, date, isPresent } = req.body;
  try {
    const attendance = new Attendance({
      employee: employeeId,
      date,
      isPresent,});
      await attendance.save();
      res.status(StatusCodes.CREATED).json({ message: "Attendance created" });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Attendance error" });
  }
}

module.exports = {

  signUp,
  signIn,
  updateHr,
  deleteHr,
  addAttendance
};
