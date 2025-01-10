import express from "express"
import {addToCart} from "../controller/auth.controller.js"
const router=express.Router()

router.post('addtocart',addToCart)



export default router