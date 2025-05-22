const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main()
  .then(() => {
    console.log("successfull");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');  //27017 - Port of mongoDB
}

let allChats = [
    {
        from:"abhinav",
        to:"atharva",
        msg:"khane chal",
        delivered_on:new Date()
    },
    {
        from:"devansh",
        to:"atharva",
        msg:"laga game",
        delivered_on:new Date()
    },
    {
        from:"parth",
        to:"atharva",
        msg:"hehehe",
        delivered_on:new Date()
    },
    {
        from:"abhinav",
        to:"devansh",
        msg:"form bhar",
        delivered_on:new Date()
    }
]


Chat.insertMany(allChats);