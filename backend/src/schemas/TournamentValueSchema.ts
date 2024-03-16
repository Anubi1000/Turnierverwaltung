import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(1).required(),
  type: Joi.string().regex(new RegExp("input|calculated")).required(),
  formula: Joi.string()
    .min(1)
    .when("type", {
      is: Joi.equal("calculated"),
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    }),
});

export default schema;
