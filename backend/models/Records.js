const mongoose = require('mongoose');
const recordSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
      },
     activity:{
        type:String,
        required:true
     } ,

    duration: {
        type: Number,
        required: true,
      },
     user:{
      type:mongoose.ObjectId,
      ref:'User',
      required:true
     }
    
  });
  const Records = mongoose.model('Records', recordSchema);
  module.exports=Records