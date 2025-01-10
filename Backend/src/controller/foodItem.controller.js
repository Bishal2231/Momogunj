import { Momo } from "../model/momo.model.js";
import { Chowmein } from "../model/chowmein.model.js";
import {SoftDrink} from "../model/softDrink.model.js";    
const handleMomo = async (req, res) => {
const {name,subTags,rating,estimatedTime,type,id,price,foodLink}=req.body
console.log(req.body)
// background image 

try {
    // if(!name||!rating||!estimatedTime||!type||!id||!price||!foodLink){
    //     return res.status(400).json({message:"All fields are required"})
    // }
    const newMomo = new Momo({
        name,subTags,rating,estimatedTime,type,id,price,foodLink})


    await newMomo.save()
    res.status(201).json({message:"Momo added successfully",newMomo})
} catch (error) {
    console.log( "handle momo error ", error)

    throw error;
}



}
const handleChowmein=async(req,res)=>{
const {name,subTags,rating,estimatedTime,type,id,price,foodLink}=req.body
console.log(req.body)
try {
    // if(!name||!rating||!estimatedTime||!type||!id||!price||!foodLink){
    //     return res.status(400).json({message:"All fields are required"})
    // }
    const newChowmein = new Chowmein({
        name,subTags,rating,estimatedTime,type,id,price,foodLink
    })
        await newChowmein.save()
    res.status(201).json({message:"Chowmein added successfully",newChowmein})
    }catch(error){
    console.log("handle chowmein error",error)
    throw error
}}
const handleSoftdrink=async(req,res)=>{
    const {name,subTags,rating,estimatedTime,type,id,price,foodLink}=req.body

    try {
        // if(!name||!rating||!estimatedTime||!type||!id||!price||!foodLink){
        //     return res.status(400).json({message:"All fields are required"})
        // }
        const newSoftDrink = new SoftDrink({
            name,subTags,rating,estimatedTime,type,id,price,foodLink
        })
            await newSoftDrink.save()
        res.status(201).json({message:"SoftDrink added successfully",newSoftDrink})
    } catch (error) {
        console.log(error)
    }


}

const handleMomoData=async(req,res)=>{
  try {
      const momoArr= await Momo.find();
      res.status(200).json({momoArr})
  } catch (error) {
      console.log("error",error)

    
  }
}
const handleChowmeinData=async(req,res)=>{
    try {
        const chowmeinArr= await Chowmein.find();
        res.status(200).json({chowmeinArr})
    } catch (error) {
        console.log("error",error)
  
      
    }
  }
const handleSoftdrinkData=async(req,res)=>{
    try {
        const softdrinkArr= await SoftDrink.find();
        res.status(200).json({softdrinkArr})
    } catch (error) {
        console.log("error",error)
  
      
    }
  
}

const handlefoodItemDetail=async(req,res)=>{
    const {foodLink,id}=req.params
    console.log(req.params)
    console.log("not showin g rewq.bopdy")
    console.log("working")

    try {
        if(foodLink==="momo"){
            const data= await Momo.findById(id)
          res.status(200).json({data})
        }
        if(foodLink==="chowmein"){
            const data= await Chowmein.findById(id)
            console.log(data)
            res.status(200).json({data})
        }
        if(foodLink==="softdrinks"){
            const data= await SoftDrink.findById(id)
            console.log(data)
            res.status(200).json({data})
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({message:"error getting food item details"})
    }
}
export {handleMomo,handleChowmein,handleMomoData,handleChowmeinData,handleSoftdrinkData,handleSoftdrink,handlefoodItemDetail}