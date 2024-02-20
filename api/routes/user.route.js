import express from 'express'
import { createUser, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/create-user', createUser)
router.patch('/update-user', verifyToken, updateUser)

export default router