import express from 'express'
import createError from 'http-errors'
import IndexController from '../controllers/index-controller.js'

export const router = express.Router()

const indexController = new IndexController()

router.get('/', indexController.showHomePage)
router.use('*', (req, res, next) => next(createError(404)))
