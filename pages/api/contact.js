import Nodemailer from 'nodemailer';
require('dotenv').config();

// creating a Nodemailer instance
// requires : Email (to send email FROM), Password (of that email)
// uses : env variables EFROM, PASSWORD
const transporter = Nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.EFROM,
        pass: process.env.PASSWORD,
    },
});

// To use Gmail service it is required to enable some features every now-and-then,
// otherwise depolyed/published site won't allow mailing service through Gmail
// todo : enable Display Unlock Captcha (http://www.google.com/accounts/DisplayUnlockCaptcha)
// todo : enable Google Account's (of Sender's email i.e. EFROM) Less Secure Apps access (https://www.google.com/settings/security/lesssecureapps)
export default (req, res) => {
    return new Promise((resolve) => {
        if (req.method == 'POST') {
            // Mail Body
            // requires : from, to, subject, text
            const mail = {
                from: process.env.EFROM,
                to: process.env.ETO,
                subject: `${req.body.subject} - ${req.body.name}`,
                text: `Name: ${req.body.name} \nEmail: ${req.body.email} \n${req.body.message}`,
            };

            // Sends the mail
            transporter.sendMail(mail, (err) => {
                if (err) {
                    res.status(500).json({ msg: err });
                    return resolve();
                } else {
                    res.status(200).json({ msg: 'Sent succesfully.' });
                    return resolve();
                }
            });
        }
    });
};
