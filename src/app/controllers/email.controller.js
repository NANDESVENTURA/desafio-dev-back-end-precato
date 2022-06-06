const nodemailer = require("nodemailer");
const Email = require("email-templates");
require('dotenv').config()

const sendMessage = async (subscriber, message) => {
    try {
        const poolConfig = {
            service: "gmail",            
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        };
        const pool = nodemailer.createTransport(poolConfig);
        const email = new Email({
            message: {
                from: "Flow Message",
            },
            template: "mailModel",
            send: true,
            preview: false,
            transport: pool,
        });

        const content = {
            time: (new Date()).toISOString(),
            reportName: "Message Flow",
            subscriber: subscriber,
            message: message,
        };
        await email.send({
            message: {
                to: [subscriber.email],
            },
            template: "mailModel",
            locals: content,
        });
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    sendMessage,
};
