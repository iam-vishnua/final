const mongoose = require('mongoose');
const exerciseSchema = new mongoose.Schema({
    name: String,
    muscle: String,
    equipment: String,
    instructions: String,
    difficulty:String,
    image: String,
    
    
    
    
  });
  const Exercises = mongoose.model('Exercises', exerciseSchema);
  module.exports=Exercises