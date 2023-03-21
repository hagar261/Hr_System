
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const rbac = require("../rbac/rbac");

module.exports = (endPoints) => {
  return async (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        try {
          const decoded = jwt.verify(token, "shhhhh");
          req.hr = decoded;
          const isAllowed = await rbac.can(req.hr.role, endPoints);
          if (isAllowed) {
            next();
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ message: "UNAUTHORIZED" });
          }
        } catch (error) {
          res.json({ message: error });
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      }
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "UNAUTHORIZED ****" });
    }
  };
};
