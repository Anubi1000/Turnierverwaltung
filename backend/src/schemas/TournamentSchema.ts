import Joi from "joi";
import TournamentValueSchema from "./TournamentValueSchema.js";

const schema = Joi.object({
  name: Joi.string().required(),
  values: Joi.array().items(TournamentValueSchema).required(),
});

export default schema;
