import express from 'express'
import createError from 'http-errors'
import IndexController from '../controllers/index-controller.js'
import { router as oauthRouter } from './oauth-router.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

const indexController = new IndexController()

/**
 * Checks if the token needs to be refreshed.
 *
 * @param {object} req  Express request object
 * @param {object} res Express response object
 * @param {Function} next Express next function
 */
const checkToken = (req, res, next) => {
  try {
    if (req.session.auth) {
      const token = req.session.auth
      const createdAt = token.created_at
      const expiresIn = token.expires_in
      const currentTime = Math.floor(Date.now() / 1000)
      const expirationTime = createdAt + expiresIn

      console.log(currentTime)
      console.log(expirationTime)

      if (currentTime >= expirationTime) {
        res.redirect('/oauth/refresh')
      } else {
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}

router.use('/oauth', oauthRouter)
router.use('/user', checkToken, userRouter)

router.get('/', indexController.createGitlabUrl, indexController.showHomePage)
router.use('*', (req, res, next) => next(createError(404)))
