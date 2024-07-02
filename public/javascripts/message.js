require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMS = async (body) => {
    let msgOption = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: '+918748030185',//process.env.TO_NUMBER,
        body,
    };
    try {
        const message = await client.messages.create(msgOption);
        console.log(message);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Example usage
sendSMS('ThanYou Your Table has been Reserved Successfully');