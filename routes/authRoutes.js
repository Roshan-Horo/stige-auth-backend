import express from 'express'
const router = express.Router()
import { registerUser, authUser} from '../controller/signupController.js'
//import { signup} from '../controller/authController.js'

// @desc    - testing
// @route   - GET /api/auth
//@access   - public
router.get('/', (req,res) => {
    res.send('test auth route')
})

// @desc    - SIGNUP
// @route   - POST /api/auth
//@access   - public
router.post('/', registerUser)

// @desc    - LOGIN
// @route   - POST /api/auth/login
//@access   - public
router.post('/login', authUser)

// @desc    - Google LOGIN
// @route   - POST /api/auth/googlelogin
//@access   - public

//router.post('/googlelogin', )

export default router