import { generateHmacSha256Hash } from "../utility/esewa.utility.js";
import { Transaction } from "../model/Transaction.model.js";
import axios from "axios";

const initiatePayment = async (req, res) => {
  try {
    const { amount, productId } = req.body;
    const paymentData = {
      amount,
      failure_url: process.env.FAILURE_URL,
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: process.env.MERCHANT_ID,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: process.env.SUCCESS_URL,
      tax_amount: "0",
      total_amount: amount,
      transaction_uuid: productId,
    };

    const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
    const signature = generateHmacSha256Hash(data, process.env.SECRET);
    paymentData.signature = signature;

    const paymentResponse = await axios.post(
      process.env.ESEWAPAYMENT_URL,
      null,
      { params: paymentData }
    );

    if (paymentResponse.status === 200) {
      const transaction = new Transaction({
        product_id: productId,
        amount,
      });
      await transaction.save();

      return res.status(200).json({ url: paymentResponse.request.res.responseUrl });
    } else {
      return res.status(400).json({ message: "Payment initiation failed" });
    }
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const paymentStatus = async (req, res) => {
  try {
    const { product_id } = req.body;

    const transaction = await Transaction.findOne({ product_id });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const paymentData = {
      product_code: process.env.MERCHANT_ID,
      total_amount: transaction.amount,
      transaction_uuid: transaction.product_id,
    };

    const response = await axios.get(process.env.ESEWAPAYMENT_STATUS_CHECK_URL, {
      params: paymentData,
    });

    if (response.data && response.data.status) {
      transaction.status = response.data.status;
      await transaction.save();

      return res
        .status(200)
        .json({ message: "Transaction status updated successfully", status: response.data.status });
    } else {
      return res.status(400).json({ message: "Invalid status response from eSewa" });
    }
  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { initiatePayment, paymentStatus };
