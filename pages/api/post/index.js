import { withIronSessionApiRoute } from 'iron-session/next'

import createHandler from '../../../lib/middlleware/nextConnect'
import validate from '../../../lib/middlleware/validation'
import { ironConfig } from '../../../lib/middlleware/ironSession'

import { createPostSchema } from '../../../modules/post/post.schema'
import { createPost, getPosts } from '../../../modules/post/post.service'

const handler = createHandler()

handler
  .post(validate({ body: createPostSchema }), async (req, res) => {
    try{
      if (!req.session.user) return res.status(401).send()
    

      const newPost = await createPost(req.body, req.session.user )
      res.status(201).send(newPost)

    } catch (err) {
      return res.status(500).send(err.message)
    }
  })

  .get( async (req, res) => {
    try{
      if (!req.session.user) return res.status(401).send()

      const posts = await getPosts()
      res.status(200).send(posts)

    } catch (err) {
      return res.status(500).send(err.message)
    }
  })

export default withIronSessionApiRoute( handler, ironConfig )