import Transaction from '../models/Transaction';
import app from '../app';
import nodemailer from 'nodemailer';

let dataClient = null;

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'fuera.deo.tunja@gmail.com',
      pass: 'lalala123..'
    }
});

async function sendEmail(mail){
    let info = await transporter.sendMail({
        from: 'fuera.deo.tunja@gmail.com',
        to: mail,
        subject: 'Confirmación pago TOXIC SOULS RECORDS',
        text: `Hemos recibido un pago para un evento de TOXIC SOULS RECORDS.\nA nombre de ${dataClient.customer_data.full_name} con documento de identificación ${dataClient.customer_data.legal_id_type}-${dataClient.customer_data.legal_id} y número de celular ${dataClient.customer_data.phone_number}. Transacción con un valor de ${dataClient.amount_in_cents/100} COP, por medio de ${dataClient.payment_method_type}`,
    });
}

export const emailConfirm = async(req, res) => {
    dataClient = req.body.data.transaction
    console.log('email',dataClient.customer_email);
    console.log('client',dataClient.customer_data);
    let totalPayment = dataClient.amount_in_cents/100;
    createTransaction(dataClient.status, dataClient.customer_data.full_name, dataClient.customer_email, 
        dataClient.customer_data.legal_id_type, dataClient.customer_data.phone_number, totalPayment, dataClient.payment_method_type);
    if(dataClient.status == 'APPROVED'){
        await sendEmail(dataClient.customer_email);
    }
    return res.sendStatus(200)
}

async function createTransaction (statusPayment, nameClient, emailClient, docId, phoneNumber, totalPayment, paymentMethod) {
    console.log('Try to create transaction')
    try{
        var transaction = new Transaction({
            statusPayment,
            nameClient,
            emailClient,
            docId,
            phoneNumber,
            totalPayment,
            paymentMethod
        });
        await transaction.save();
        console.log('transaction', transaction)
        return "ok";
    } catch (error) {
        return "error"
    }
};

export const getTransactions = async (req, res) => {
    const transactions = await Transaction.find();
    res.status(200).send({
        'status': 'ok',
        transactions
    });
};
