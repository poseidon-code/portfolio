import Nodemailer from 'nodemailer';
require('dotenv').config();

const transporter = Nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EFROM,
        pass: process.env.PASSWORD,
    },
});

export default (req, res) => {
    // return new Promise((resolve) => {
    if (req.method == 'POST') {
        const mail = {
            from: process.env.EFROM,
            to: process.env.ETO,
            subject: `${req.body.subject} - ${req.body.name}`,
            text: `Name: ${req.body.name} \nEmail: ${req.body.email} \n${req.body.message}`,
        };

        transporter.sendMail(mail, (err) => {
            if (err) {
                res.status(500).json({ msg: err });
                // return resolve();
            } else {
                res.status(200).json({ msg: 'Sent succesfully.' });
                // return resolve();
            }
        });
    }
    // });
};
