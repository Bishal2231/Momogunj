import express from "express"
// import { handleMomo } from "./controller/momo.controller.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import { signup, verifyemail,resetPassword ,forgetpassword} from "./controller/auth.controller.js"
import { login } from "./controller/auth.controller.js"
import { logout } from "./controller/auth.controller.js"
import { verifyToken } from "./middlewares/verifyToken.js"
import { checkAuth } from "./controller/auth.controller.js"
import { upload } from "./middlewares/multer.middleware.js"
import { initiatePayment,paymentStatus } from "./controller/esewa.controller.js"
import fooditems from "./routes/foodItem.routes.js"
import user from "./routes/user.routes.js"

import cors from "cors"
import path from 'path'
import { fileURLToPath } from "url"
const app=express()

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the origin
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the origin
    }
  },credentials:true,
};
app.set('view engine','ejs')
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.resolve('views'));
app.use(express.static('public'))
app.use(cors(corsOptions));
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))



app.use("/foodItems",fooditems)
app.use('/user',user)

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



app.post('/initiate-payment',initiatePayment)
app.post('/payment-status',paymentStatus)

import { verifyKhaltiPayment,initializeKhaltiPayment } from "./controller/khalti.controller.js"
import { Payment } from "./model/payment.model.js"
import { PurchasedItem } from "./model/purchasedItem.model.js"

app.post("/initialize-khalti", async (req, res) => {
  try {
    //try catch for error handling
    const { itemId, totalPrice, website_url } = req.body;
    // const itemData = await Item.findOne({
    //   _id: itemId,
    //   price: Number(totalPrice),
    // });

    if (!itemId||!totalPrice||!website_url) {
      return res.status(400).send({
        success: false,
        message: "item not found",
      });
    }

    const purchasedItemData = await PurchasedItem.create({
      item: itemId,
      paymentMethod: "khalti",
      totalPrice: totalPrice * 100,
    });

    const paymentInitate = await initializeKhaltiPayment({
      amount: totalPrice * 100, // amount should be in paisa (Rs * 100)
      purchase_order_id: purchasedItemData._id,
      purchase_order_name: "sample",
      return_url: `${process.env.BACKEND_URI}/complete-khalti-payment`,
      website_url,
    });
    if(!paymentInitate){
      return res.status(400).json({data:{ payment:{payment_url:`${process.env.FAILURE_URL}`}}})
    }

    res.json({
      success: true,
      purchasedItemData,
      payment: paymentInitate,
    });
  } catch (error) {
    // res.json({
    //   success: false,
    //   error,
    // });
    res.render('failure.ejs')
  }
});
app.get("/complete-khalti-payment", async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;

  try {
    const paymentInfo = await verifyKhaltiPayment(pidx);

    // Check if payment is completed and details match
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      // return res.status(400).json({
      //   success: false,
      //   message: "Incomplete information",
      //   paymentInfo,
      // });
      return res.render('failure.ejs')
    }

    // Check if payment done in valid item
    const purchasedItemData = await PurchasedItem.find({
      _id: purchase_order_id,
      totalPrice: amount,
    });

    if (!purchasedItemData) {
      return res.status(400).send({
        success: false,
        message: "Purchased data not found",
        
      });
    }
    await PurchasedItem.findByIdAndUpdate(
      purchase_order_id,

      {
        $set: {
          status: "completed",
        },
      }
    );

    // Create a new payment record
    const paymentData = await Payment.create({
      pidx,
      transactionId: transaction_id,
      productId: purchase_order_id,
      amount,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "khalti",
      status: "success",
    });

    // Send success response
     
    // res.json({
    //   success: true,
    //   message: "Payment Successful",
    //   paymentData,
    // });
    console.log(paymentData)
    return res.render('success.ejs',{paymentData})

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error,
    });
  }
});








export {app}