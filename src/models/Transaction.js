import { Schema, model } from "mongoose";

const TransactionModel = new Schema ({
    statusPayment: {type: String, required: true},
    nameClient: {type: String, required: true},
    emailClient: {type: String, required: false},
    docId: {type: String, required: false},
    phoneNumber: {type: String, required: false},
    totalPayment: {type: String, required: false},
    paymentMethod: {type: String, required: false},
}, {
    timestamps: true,
    versionKey: false
});

export default model('Transaction', TransactionModel);