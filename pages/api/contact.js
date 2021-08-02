import Nodemailer from 'nodemailer';
require('dotenv').config();
import Cors from 'cors';

const middleware = (middleware) => {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
};

const cors = middleware(
    Cors({
        methods: ['GET', 'POST', 'OPTIONS'],
    })
);

const transporter = Nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EFROM,
        pass: process.env.PASSWORD,
    },
});

export default async (req, res) => {
    await cors(req, res);
    return new Promise((resolve) => {
        if (req.method == 'POST') {
            const mail = {
                from: process.env.EFROM,
                to: process.env.ETO,
                subject: `${req.body.subject} - ${req.body.name}`,
                text: `Name: ${req.body.name} \nEmail: ${req.body.email} \n${req.body.message}`,
            };

            transporter.sendMail(mail, (err) => {
                if (err) {
                    res.status(500).send();
                    return resolve();
                } else {
                    res.status(200).send();
                    return resolve();
                }
            });
        }
    });
};
