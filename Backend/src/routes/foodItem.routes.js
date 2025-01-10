import express from "express"
import { handleMomo ,handleMomoData,handleChowmein,handleChowmeinData,handleSoftdrink,handleSoftdrinkData,handlefoodItemDetail} from "../controller/foodItem.controller.js"
// import {handleChowmein} from "../controller/foodItem.controller.js"

const router=express.Router()

router.post("/momo",handleMomo)
router.post("/chowmein",handleChowmein)
router.post("/softdrinks",handleSoftdrink)

router.get("/momo",handleMomoData)
router.get("/chowmein",handleChowmeinData)
router.get("/softdrinks",handleSoftdrinkData)

router.get('/getfooditemDetail/:foodLink/:id',handlefoodItemDetail)

export default router