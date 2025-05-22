const mongoose = require("mongoose");

let chatSchema = new mongoose.Schema({
     from:{
        type:String,
        required:true
     },
     to:{
        type:String,
        required:true
     },
     msg:{
        type:String,
     },
     delivered_on:{
        type:Date,
     }
})

const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;