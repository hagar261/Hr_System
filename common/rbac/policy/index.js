const roles = require("../../enum/roles");
const hrPolicy = require("./hrPolicy");


const opts = {
  [roles.role]: {
    can: hrPolicy,
  }
};


module.exports = opts