const User = require('../models/user')
const {hashPassword , comparePassword} = require('../helpers/user')
const jwt = require('jsonwebtoken')
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

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.json({ error: 'User not found' });
      }
  
      const match = await comparePassword(password, user.password);
  
      if (match) {
        jwt.sign(
          { email: user.email, id: user._id, name: user.name },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Internal server error' });
            }
            //console.log(token);
            res.cookie('token', token);
            // Send user data along with token
            return res.json(user);
          }
        );
      } else {
        return res.json({ error: 'Incorrect password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const getProfile = (req,res) => {
     const {token} = req.cookies
     console.log(token)
     if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user) => {
            if(err) throw err;
            res.json(user)
        })
     }
     else{
        res.json(null)
     }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}