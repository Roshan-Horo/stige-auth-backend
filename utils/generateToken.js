import jwt from 'jsonwebtoken'

const generateToken = (name,email,password) => {
    return jwt.sign({name,email,password}, process.env.JWT_SECRET, {
        expiresIn: '120m'
    })
}

export default generateToken