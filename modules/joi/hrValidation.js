const Joi = require('joi');

module.exports = {
    signUpSchema:{
        body:Joi.object().required().keys({
            name:Joi.string().required().messages({// law 3yza a7ot custom error
                "string.empty":"sorry ...name is required"
            }),
            email:Joi.string().required().email(),
            password:Joi.string().required(),
            role: Joi.string(),
      
        })
    },
    signInSchema:{
        body:Joi.object().required().keys({
            email:Joi.string().required().email(),
            password:Joi.string().required(),
        })
    },
    updateHrSchema: {
        params: Joi.object().required().keys({
          id: Joi.string(),
        }),
        body: Joi.object().required().keys({
          name: Joi.string().required(),
        }),
    },
    
};
