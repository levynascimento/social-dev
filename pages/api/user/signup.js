import Joi from 'joi'
import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middlleware/nextConnect'
import validate from '../../../lib/middlleware/validation'
import { signupUser } from '../../../modules/user/user.service'
import { signupSchema } from '../../../modules/user/user.schema'
import { ironConfig } from '../../../lib/middlleware/ironSession'



const signup = createHandler()
  .post(validate({body: signupSchema }), async ( req, res ) => {
    try {
      const user = await signupUser(req.body)
      req.session.user = {
        id: user._id,
        user: user.user
      }
      await req.session.save()
      res.status(201).json({ ok: true })
    } catch (err) {
        console.error( err )
        throw err 
    }
    
  })

export default withIronSessionApiRoute(signup, ironConfig)