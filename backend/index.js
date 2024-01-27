const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/user');
const cookeParser=require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const app = express()
const port = 3000

const cors = require('cors');
const cookieParser = require('cookie-parser');
const Records = require('./models/Records');
const Exercises=require('./models/Exercises')

app.use(cors({
  origin:["http://localhost:5173"],
  methods:['GET','POST','PATCH','DELETE'],
  credentials:true

}))
app.use(cookieParser())
  

app.use(express.json())
const verifyLogin=(req,res,next)=>{
  const token=req.cookies.token
  if(!token){
    res.status(401).send("unauthorized access")
  }
  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded._id
    console.log(decoded)
  } catch(err) {
    res.status(401).send("unauthorized access")
  }
  next()




}
app.get('/records',verifyLogin,async(req,res)=>{
  try{
    const records=await Records.find({user:req.user})
    res.status(200).json(records)
  }
  catch(err){
    res.status(500).send("error")
    console.log(err)
  }
}
)
app.post('/records',verifyLogin,
async(req,res)=>{
  const user=req.user
  const data=req.body
  console.log(data)
  try{
    const records=new Records({
      ...data,
      user:user
    })
    await records.save()
      res.status(201).json(data)
    
  }
  catch(err){
    res.status(400).send("invalid input data")
    console.log(err)
  }
})

app.post('/users/signup',async (req, res) => {
try{
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  const user=new User({
    ...req.body,
    password: hash})
  await user.save()
  res.status(201).json(user)
}
catch(err){
  res.status(400).send("invalid signup")

}
})
app.post('/users/login',async (req, res) => {
  try{
    const email=req.body.email
    const password=req.body.password
    const user=await User.findOne({email:email})
    if(!user){
      return res.status(404).send("user not found")
    }
    const passwordmatch=bcrypt.compareSync(password, user.password);
    if(!passwordmatch){
      return res.status(401).send("login failed")
    }
    const token = jwt.sign({_id:user._id,name:user.name },process.env.JWT_SECRET, {
      expiresIn:3*24*60*60,
    });
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false
    });
    res.status(200).json({ message: "User logged in successfully",user:{_id:user._id,name:user.name }});
  }
  
  catch(err){
    res.status(400).send(" invalid login")
    
  
  }
  })
  app.post('/users/verify',async(req,res)=>{
    console.log(req.cookies)
    const token=req.cookies.token
    if(!token){
      return res.status(401).send("user not logged in")
    }
    return res.status(200).send("user is logged in")
  })
  app.delete('/records/:recordId',verifyLogin,async(req,res)=>{
    try{
       const givenRecord=await Records.findById(req.params.recordId)
       const recordBy=givenRecord.user.toString()
       if(recordBy===req.user){
        await Records.findByIdAndDelete(req.params.recordId)
        res.status(204).send("deleted")

       }
       else{
        res.status(401).send("unauthorized action")
       }
    }
    catch(err){
      res.status(404).send("record with given id not found")
    }
  })
  app.get('/exercises', async (req, res,next) =>{
    try{
        const exercises = await Exercises.find({});
        res.status(200).json(exercises)
    }
    catch(error){
        res.status(500).send('Error occured')
            
    }
  })
    app.post('/exercises',async(req,res,next)=>{
      try{
        const exercise=new Exercises(req.body)
        await exercise.save()
        res.status(201).json(exercise)
      }
      catch(error){
        res.status(500).send("error occured")
      }
    })
    app.post('/users/logout', (req, res) => {
      // Clear the token cookie to log the user out
      try{
      res.clearCookie('token', { withCredentials: true });
    
      // Optionally, perform any other cleanup or logout-related tasks
    
      // Respond with a success message or redirect to the login page
      res.status(200).json({ message: 'User logged out successfully' });
      }
      catch(error){
        console.log(error)

      }
    });
  
 


main().then(()=>console.log("db connected")).catch(err => console.log(err));

async function main() {
  const url=process.env.DB_URL
  const password=process.env.DB_PWD
  const urlWithPassword=url.replace('<password>',password)
  
  await mongoose.connect(urlWithPassword);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}