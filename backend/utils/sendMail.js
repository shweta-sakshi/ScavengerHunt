const nodemailer = require("nodemailer");
let sendMailCount = 0;  // Initialize counter

const sendMail = async (options) => {
    try {
        sendMailCount++;
        console.log(`SendMail request count: ${sendMailCount}`);
        const transport = nodemailer.createTransport({
            service: process.env.NITA_SERVICE,
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                clientId: process.env.OAUTH_CLIENTID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            }
        });

        const mailOption = {
            from: process.env.NITA_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transport.sendMail(mailOption);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = sendMail;