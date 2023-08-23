import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/errors.js"
import jwt from "jsonwebtoken"

export const signup = async(req,res, next) => {

    const {username, email, password} = req.body
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    try {
        await newUser.save()
        res.status(201).json({message : "User created Successfully!"})
    } catch (error) {
        next(error)
    }
   
}

export const signin = async(req,res, next) => {

    const {email, password} = req.body
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandler(404, "User not found"))
        const validPassword = await bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials"))
        const jwt_token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)
        const {password : hashedPassword, ...rest} = validUser._doc
        const expiry_time = new Date(Date.now() + 86400)
        res.cookie('access_token', jwt_token, {httpOnly : true ,expires : expiry_time} ).status(200).json(rest)
    } catch (error) {
        next(error)
    }

}