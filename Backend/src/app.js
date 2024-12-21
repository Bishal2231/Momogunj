import express from "express"
import { handleMomo } from "./controller/momo.controller.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { signup, verifyemail,resetPassword ,forgetpassword} from "./controller/auth.controller.js"
import { login } from "./controller/auth.controller.js"
import { logout } from "./controller/auth.controller.js"
import { verifyToken } from "./middlewares/verifyToken.js"
import { checkAuth } from "./controller/auth.controller.js"
import { upload } from "./middlewares/multer.middleware.js"
import cors from "cors"
const app=express()

app.use(cors({
    origin:"http://localhost:5173",credentials:true,
}))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


app.get("/",(req,res)=>{
    res.send("working")
})
app.get('/check-auth',verifyToken,checkAuth)
app.post("/signup",upload.single("avatar"),signup)

app.post("/verify-email",verifyemail)
app.post("/forget-password",forgetpassword) 
app.post("/reset-password/:token",resetPassword)

app.post("/login",login)

app.post("/logout",logout)


app.post("/updateMomo",handleMomo)


   

app.get("/test-cookie", (req, res) => {
    res.cookie("test", "cookieTestValue", {
        httpOnly: true,
        secure: false, // Change to true in production
        sameSite: "lax",
        maxAge: 1000 * 60 * 60, // 1 hour
    });
    res.send("Cookie set successfully!");
});






export {app}