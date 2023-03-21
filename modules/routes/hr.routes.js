const validationRequest = require("../../common/middleware/validationRequest");
const {  signUp, signIn, updateHr, deleteHr, addAttendance } = require("../controller/hr.controller");
const { signUpSchema, signInSchema, updateHrSchema } = require("../joi/hrValidation");
const isAuthorized = require("../../common/middleware/isAuthorized");
const {  SIGN_IN, UPDATE_HR, DELETE_HR, ADD_ATTENDANCE } = require("../endpoints");
const router = require("express").Router();


router.post("/signUp",validationRequest(signUpSchema) , signUp); 
router.post("/signIn",isAuthorized(SIGN_IN),validationRequest(signInSchema) , signIn); 
router.patch("/updateHr/:id",isAuthorized(UPDATE_HR),validationRequest(updateHrSchema), updateHr);
router.delete("/deleteHr/:id",isAuthorized(DELETE_HR), deleteHr);
router.post("/addAttendance", isAuthorized(ADD_ATTENDANCE),addAttendance);


module.exports = router;