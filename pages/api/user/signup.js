import Joi from 'joi'

import createHandler from '../../../lib/middlleware/nextConnect'

import validate from '../../../lib/middlleware/validation'

import { signupUser } from '../../../modules/user/user.service'

const postSchema = Joi.object({
  firstName: Joi.string().required().max(50),
  lastName: Joi.string().required().max(50),
  user: Joi.string().required().max(30),
  email: Joi.string().email().required().max(100),
  password: Joi.string().required().max(50).min(6),
})

const signup = createHandler()
  .post(validate({body: postSchema }), ( req, res ) => {
    signupUser(req.body)
    res.status(200).json({ teste: "ok"})
  })

export default signup