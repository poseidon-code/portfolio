import Nodemailer from 'nodemailer';
require('dotenv').config();

const transporter = Nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: 'pritamhalder.portfolio@gmail.com',
        pass: process.env.PASSWORD,
    },
});

export default (req, res) => {
    if (req.method == 'POST') {
        const mail = {
            from: 'pritamhalder.portfolio@gmail.com',
            to: 'pritamhalder05062000@gmail.com',
            subject: `${req.body.subject} - ${req.body.name}`,
            text: `Name: ${req.body.name} \nEmail: ${req.body.email} \n${req.body.message}`,
        };

        transporter.sendMail(mail, (err) => {
            if (err) {
                res.status(500).send();
            } else {
                res.status(200).send();
            }
        });
    }
};
