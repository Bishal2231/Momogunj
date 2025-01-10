import mongoose from "mongoose"

const momoSchema=new mongoose.Schema({
    name:{
        type:String
    } ,
    backgroundImage:{
        type:String,
        default:"https://junifoods.com/wp-content/uploads/2024/06/C…omo-dumpling-restaurant-style-recipe-1024x693.jpg"
    } ,
    subTags:{
        type:[String]
    },
    rating:{
        type:String
    },

    estimatedTime:{
        type:String
    },
    type:{type:String},
        
    id:{type:String},
    price:{type:Number},
    foodLink:{type:String,default:"momo"}

},{timestamps:true

})
export const Momo=mongoose.model("Momo",momoSchema)