import mongoose from "mongoose"

const momoSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    }

},{timestamps:true

})
export const Momo=mongoose.model("Momo",momoSchema)