import express from 'express'
import UserController from '../controllers/user-controller.js'

export const router = express.Router()

const userController = new UserController()

router.get('/profile', userController.renderUserProfile)
router.get('/activities', userController.renderActivities)
router.get('/projects', userController.renderGroups)
