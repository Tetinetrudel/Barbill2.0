import express from 'express'
import { google, signIn, signout } from '../controllers/auth.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/google', google)
router.post('/sign-in', signIn)
router.post('/sign-out', signout)

export default router