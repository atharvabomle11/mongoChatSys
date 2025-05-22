const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const port = 8020;

app.use(express.urlencoded({extended:true}));  // Middleware
app.use(express.json());                       // Middleware for json objects
app.use(express.static(path.join(__dirname,"public")));  // for accessing static files like css
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

main()
  .then(() => {
    console.log("successfull");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');  //27017 - Port of mongoDB
}

// chat1 
//     .save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })



app.get("/",(req,res)=>{
    res.send("Successfull");
})

app.get("/chats",async (req,res)=>{
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs",{chats});
})

app.get("/chats/new",(req,res)=>{
   res.render("new.ejs");
})

app.post("/chats",(req,res)=>{
    let {from,msg,to} = req.body;
    let newChat = new Chat({
      from : from,
      msg : msg,
      to : to,
      delivered_on: new Date()
    })
    newChat
      .save()
      .then((res)=>{
        console.log("chat was saved");
      })
      .catch((err)=>{
        console.log(err);
      })
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async(req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs",{chat});
})

app.put("/chats/:id",async(req,res)=>{
  let {id} = req.params;
  let { msg : newMsg} = req.body;
  console.log(newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{new:true});
  res.redirect("/chats");
})

app.delete("/chats/:id",async(req,res)=>{
  let {id} = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
})
app.listen(port,(req,res)=>{
    console.log(`Listening on port:${port}`);
})

