import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js'
import expressJWT from 'express-jwt'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'
import sgMail from '@sendgrid/mail'
//import { errorHandler } from '../middleware/errorMiddleware.js';
sgMail.setApiKey(process.env.MAIL_KEY)

const signup = asyncHandler( async(req,res) => {
    const {name,email,password}  = req.body
    console.log(name,email,password)

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const token = generateToken(name,email,password);

    // activation link via email
    const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Account activation link',
        html: `
          <h1>Please click to this link to activate your account</h1>
          <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
          <hr/>
          <p>This email contain sensitive info</p>
          <p>${process.env.CLIENT_URL}</P>
        `
    }

    sgMail.send(emailData).then(sent => {
        return res.json({
            message: `Email has been sent to ${email}`
        })
    }).catch(err => {
        return res.status(400).json({
            error: errorHandler(err)
        })
    })
})

export {
    signup
}
