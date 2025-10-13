// server/config/twilio.js
import twilio from "twilio";

const client = twilio(

  process.env.TWILIO_AUTH_TOKEN,       // auth_token
  process.env.TWILIO_PHONE_NUMBER,    // phone number
 process.env.TWILIO_ACCOUNT_SID 
);
 console.log(`${client}`)
export default client;
