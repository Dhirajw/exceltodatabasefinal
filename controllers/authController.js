const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require('crypto');
const PasswordResetToken = require("../models/PasswordResetToken");
const { sendPasswordResetEmail } = require("../utils/email.js");
const { where } = require("sequelize");

const gmailRegex = /^[a-zA-Z0-9._]+@(gmail\.com|email\.com|quantique.ai)$/;

exports.register = async (req, res) => {
  try {
    const { username,email, password, name, bio,role} = req.body;
    console.log(email)

    if (!username || !email || !password || !name || !bio || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!gmailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid Gmail address." });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({where:{ email }});
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({username, email, password: hashedPassword, name, bio ,role});

    // Return success message with selected user data
    res.status(201).json({ 
      message: "User registered", 
      user: { id: user.id, username: user.username ,email: user.email, name: user.name, bio: user.bio, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async(req,res) =>{
    try{
        const{email,password} = req.body;

        if (!gmailRegex.test(email)) {
          return res.status(400).json({ message: "Please enter a valid Gmail address." });
        }

        const user = await User.findOne({where: {email} });
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error :"Invalid creditials"});
        }

        const token = jwt.sign({id:user.id},'SECRETKEY'//PROCESS.ENV.JWTSECRET//
             , {
                expiresIn : "1h"
             });
        res.json({message:"Login succesfully",token});
    }catch (error){
        res.status(500).json({error :error.message});
    }
};

exports.logout = (req,res) =>{
    res.json({ message:"Logout successful"});  
};


//only can use after login
exports.changePassword = async (req,res) =>{
  try{
    const{oldPassword ,newPassword} = req.body;
    console.log(oldPassword);
    // console.log(req.user.id);

    const user = await User.findByPk(req.user.id);
    console.log(req.user);
    //const hashOldPassword = await bcrypt.hash(oldPassword ,10);

    const isPasswordValid = bcrypt.compare(oldPassword , user.password);

    if(!isPasswordValid){
      return res.status(400).json({error : "Incorrect OLD password"});
    }
    const hashPassword =  await bcrypt.hash(newPassword ,10);
    console.log(hashPassword);
    await User.update({password:hashPassword},{
      where:{
        id:user.id
      }
    });
    res.json({message: "Password update Succesfully"});
  } catch(error){
    res.status(500).json({error: error.message});
  }
};

exports.forgetPassword = async (req,res)=>{
  try{
    const {email } = req.body;
    const user = await User.findOne({where:{ email}});

    if(!user){
      return res.status(404).json({error: "Email not regitered"});
    }


    //know about it
    const token = crypto.randomBytes(32).toString("hex");
    const expiration = new Date(Date.now() + 60*60*1000);  //1 hour

    await PasswordResetToken.create({token,email,expiration});
    await sendPasswordResetEmail(email,token);  // send the email with reset link

    res.json({message:"Password reset email sent"});
  }catch(error){
    res.status(500).json({error: error.message});
  }
};

exports.resetPassword = async(req,res)=>{
  try{
    const{token,newPassword} =req.body;


  }
  catch(error){
    res.status(500).json({error : error.message});
  }
}


