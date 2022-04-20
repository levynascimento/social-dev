import Joi from 'joi'
import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middlleware/nextConnect'
import validate from '../../../lib/middlleware/validation'
import { login } from '../../../modules/user/user.service'

import { ironConfig } from '../../../lib/middlleware/ironSession'
import { loginSchema } from '../../../modules/user/user.schema'


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
        return res.status(400).send(err.message)
        
    }
  })


export default withIronSessionApiRoute(handler, ironConfig)
