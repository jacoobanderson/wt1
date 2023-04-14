import express from 'express'
import createError from 'http-errors'
import OauthController from '../controllers/oauth-controller.js'

export const router = express.Router()

const oauthController = new OauthController()

router.get('/callback', oauthController.handleCallback, oauthController.getUser, oauthController.redirectToProfile)
router.get('/refresh')
