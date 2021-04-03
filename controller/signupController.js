import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {OAuth2Client} from 'google-auth-library'

const authUser = asyncHandler(async(req, res) => {
    const {email, password } = req.body
 
    const user = await User.findOne({ email })
 
     if(user && (await user.matchPassword(password))){
      res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id)
      })  
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
 })

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password } = req.body
 
    const userExists = await User.findOne({ email })
 
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
       name,
       email, 
       password
    })
    

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)  
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
 })

const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
const googleController = asyncHandler( async(req,res) => {
    const {token} = req.body
    // GET TOKEN FROM REQUEST

    client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT
    })
    .then(res => {
        const { email_verified,
                name,
                email
        }  = res.payload
        // Check if email verified
        if(email_verified){
            User.findOne({email}).exec((err,user) => {
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                    expiresIn: '7d'
                })  
            })

            const {_id,email,name,role} = user

            return res.json({
                token,
                user: {
                    _id,email,name,role
                }
            })
        }else{
            let password = email + process.env.JWT_SECRET
            user = new User({name,email,password})
            user.save((err,save) => {
                if(err){
                    return res.status(400)
                    throw new Error(err)
                }

                const token = jwt.sign(
                    {_id: data._id},
                    process.env.JWT_SECRET,
                    {expiresIn: '7d'}
                )

                const {_id,email,name,role} = data;
                return res.json({
                    token,
                    user: {_id,email,name,role}
                })
            })
        }
    })
})


export {
  registerUser,
  authUser
}
