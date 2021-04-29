const express=require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const bodyparser=require('body-parser');




dotenv.config({path:"./config/config.env"})
const app=express();
connectDB()



app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

app.use("/contacts",require("./routes/contact"))

app.get("/",(req,res)=>
{
    res.json("server started")
})




const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});



