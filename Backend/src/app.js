import express from "express"
import { handleMomo } from "./controller/momo.controller.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { signup, verifyemail } from "./controller/auth.controller.js"
import { login } from "./controller/auth.controller.js"
import { logout } from "./controller/auth.controller.js"
const app=express()


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.send("working")
})

app.post("/signup",signup)

app.post("/verify-email",verifyemail)
app.post("/login",login)

app.post("/logout",logout)


app.post("/updateMomo",handleMomo)


   







export {app}