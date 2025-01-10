import mongoose from "mongoose";
const softDrinkSchema = new mongoose.Schema({
    name:{
        type:String
    },backgroundImage:{
        type:String
    },subTags:{
        type:[String]
    },rating:{
        type:String
    },estimatedTime:{
        type:String
    },type:{type:String},
    price:{type:Number},
    drink:{
        type:Boolean,
        default:true
    },foodLink:{type:String,default:"softdrinks"},
    id:{type:String}
},{timestamps:true})

export const SoftDrink=mongoose.model("SoftDrink",softDrinkSchema)