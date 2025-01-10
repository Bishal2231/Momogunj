import mongoose from "mongoose";
const chowmeinSchema = new mongoose.Schema({
    name:{
        type:String
    },
    subTags:{
        type:[String]
    },rating:{
        type:String
    },estimatedTime:{
        type:String
    },
    type:{type:String},
    id:{type:String},
    price:{type:Number},
    foodLink:{type:String,default:"chowmein"}
})
export const Chowmein=mongoose.model("Chowmein",chowmeinSchema)