import express from 'express'
import createError from 'http-errors'
import IndexController from '../controllers/index-controller.js'
import { router as oauthRouter } from './oauth-router.js'
import { router as userRouter } from './user-router.js'

export const router = express.Router()

const indexController = new IndexController()

router.use('/oauth', oauthRouter)
router.use('/user', userRouter)

router.get('/', indexController.createGitlabUrl, indexController.showHomePage)
router.use('*', (req, res, next) => next(createError(404)))
