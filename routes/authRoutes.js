import express from 'express'
const router = express.Router()
import { registerUser, authUser} from '../controller/signupController.js'
//import { signup} from '../controller/authController.js'

// @desc    - SIGNUP
// @route   - GET /api/auth
//@access   - public
router.post('/', registerUser)

// @desc    - LOGIN
// @route   - GET /api/auth/login
//@access   - public
router.post('/login', authUser)

// @desc    - Google LOGIN
// @route   - GET /api/auth/googlelogin
//@access   - public
router.post('/googlelogin', r)

export default router