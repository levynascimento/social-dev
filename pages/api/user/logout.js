import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middlleware/nextConnect'
import { ironConfig } from '../../../lib/middlleware/ironSession'

const logout = createHandler()

logout.post(async (req, res) => {
  req.session.destroy()
  res.send({ ok: true })
})

export default withIronSessionApiRoute(logout, ironConfig)