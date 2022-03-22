import Joi from 'joi'
import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middlleware/nextConnect'
import validate from '../../../lib/middlleware/validation'
import { login } from '../../../modules/user/user.service'

import { ironConfig } from '../../../lib/middlleware/ironSession'

const loginSchema = Joi.object ({
  userOrEmail: Joi.string().required(),
  password: Joi.string().required()

})

const handler = createHandler()
  .post(validate({ body: loginSchema }), async (req, res) => {
    try {
      const user = await login(req.body)
      req.session.user = {
        id: user._id,
        user: user.user
      }
      await req.session.save()
      res.send({ ok: true }) 
    } catch (err) {
        console.log(err)
        throw err
    }
  })


export default withIronSessionApiRoute(handler, ironConfig)
