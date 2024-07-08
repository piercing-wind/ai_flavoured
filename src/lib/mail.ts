import Mailgun, { InputFormData } from "mailgun.js";
import formData from "form-data";

const mailgunClient = new Mailgun(formData);
const client = mailgunClient.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "",
});


export const sendTwoFAEmail = async (name: string, email: string, token: string) => {
  try{
    const MessageData = { 
      from : `Ai Flavoured <help@${process.env.MAILGUN_DOMAIN || ""}>`,
      to: email,
      subject: "Two Factor Authentication Code",
      text: ``,
      html: `
      <h1>Hello ${name}</h1>
      <p>Security is very important now a days!</p>
      <br>
      <p>Your two factor authentication code is: <strong>${token}</strong></p>
      `
    }
    await client.messages.create(process.env.MAILGUN_DOMAIN || "", MessageData);
  }catch(e){
    console.log(e);
  }
}

export const sendPasswordResetEmail = async (name: string, email: string, token: string) => {
  const resetLink = `${process.env.WEBSITE_URL}/new-password?token=${token}`;
  try {

    const MessageData = {
      from: `Ai Flavoured <password-reseter-bot@${process.env.MAILGUN_DOMAIN || ""}>`,
      to: email,
      subject: "Password Reset",
      text: ``,
      html: `
    <h1>Hello ${name}</h1>
    <p>You have requested to reset your password. Please click on the link to reset your password: <a href="${resetLink}">Reset Password</a></p>
  `,
    };

    await client.messages.create(process.env.MAILGUN_DOMAIN || "", MessageData);
  } catch (e) {
    console.log(e);
  }
}



export const sendVerificationEmail = async (name: string, email: string, token: string, callbackUrl?: string, plan?: string) => {
  try {
    const MessageData = {
      from: `Ai Flavoured <help@${process.env.MAILGUN_DOMAIN || ""}>`,
      to: email,
      subject: "Email Verification",
      text: `your account has been created!`,
      html: `
    <h1>Welcome ${name}</h1>
    <p>Please click on the <a href="${process.env.WEBSITE_URL}/new-verification?token=${token}&callbackUrl=${callbackUrl || '/'}&plan=${plan}">Click Here</a> to verify your email.</p>
  `,
    };

    await client.messages.create(process.env.MAILGUN_DOMAIN || "", MessageData);
  } catch (e) {
    console.log(e);
  }
};
