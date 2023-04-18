import express from 'express'
import OauthController from '../controllers/oauth-controller.js'

export const router = express.Router()

const oauthController = new OauthController()

router.get('/callback', oauthController.handleCallback, oauthController.getUser, oauthController.redirectToProfile)
router.get('/refresh', oauthController.refresh, oauthController.redirectToProfile)
router.get('/revoke', oauthController.revoke)
