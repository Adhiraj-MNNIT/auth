const User = require('../models/user')
const {hashPassword , comparePassword} = require('../helpers/user')
const test = (req,res) => {
    res.json('test is working')
}
//Register endpoint
const registerUser = async (req,res) => {
    try {
        const {name , email ,  password} = req.body
        if(!name){
            return res.json({
                error:'name is required'
            })
        };
        if(!password || password.length < 6){
            return res.json({
                error:'password is required and it should be atleast 6 characters long'
            })
        };

        const exist = await User.findOne({email})

        if(exist){
            return res.json({
                error:'User already exists'
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await User.create({name,email,password:hashedPassword,})

        return res.json(user);

    } catch (error) {
        console.log(error)
    }
}

//Login Endpoint 

const loginUser = async (req,res) => {
     try {
        const {email ,  password} = req.body
        
        const user = await User.findOne({email})

        if(!user){
            res.json({
                error:'User not found'
            })
        }

        const match = await comparePassword(password,user.password)

        if(match){
            res.json('password match')
        }
     } catch (error) {
        console.log(error)
     }
}

module.exports = {
    test,
    registerUser,
    loginUser
}