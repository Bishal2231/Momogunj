import mongoose from "mongoose";
import { Momo } from "./momo.model.js";
import { Chowmein } from "./chowmein.model.js";
import { SoftDrink } from "./softDrink.model.js";
const cartItemSchema = new mongoose.Schema({
  product: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
        id:{
            type: mongoose.Types.ObjectId,
            required: true,
        }
  ,  type: {
    type: String,
    enum: ["Momo", "Chowmein", "SoftDrink"], // List all possible models
    required: true,
  },

    },
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],

  },
  { timestamps: true }
);

export const UserCart = mongoose.model("UserCart", cartSchema);
