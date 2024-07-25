import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
   region: 'ap-south-1',
   credentials: {
     accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
     secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY!
   }
 });

export const sendTwoFAEmail = async (name: string, email: string, token: string) => {
  try{
   const sendEmail = async (toEmail: string, subject: string, message: string) => {
      const params = {
        Destination: {
          ToAddresses: [toEmail]
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: message
            },
            Text: {
              Charset: "UTF-8",
              Data: message
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject
          }
        },
        Source: 'AI Flavoured <contact@aiflavoured.com>' 
      };
      try {
         const data = await sesClient.send(new SendEmailCommand(params));
         console.log(`Email sent: ${data.MessageId}`);
       } catch (err) {
         console.error(err);
       }
    };
    const html= `
     <div style="font-family: Arial, sans-serif; color: #333; width : '100%';">
        <div style="background: linear-gradient(135deg, rgba(247, 217, 238, 0.831), rgba(255, 255, 255, 0.831)), rgba(236, 234, 234, 0.831); padding: 20px; border-radius: 10px; max-width: '100%'; margin: auto;">
         <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://di6ccwru5n10a.cloudfront.net/public/logo/aiflavoured.png" alt="AI Flavoured Logo" style="max-width: 250px;">
          </div>
         
         <h1 style="color: #ff0786; font-size: 2.5rem;">Hello ${name},</h1>
          <p style="font-size: 1.2rem;">To ensure the security of your account, please enter the following verification code:  <strong style="color: #ff0786;">${token}</strong></p>
          <p style="font-size: 1.2rem;">Thank you for keeping your account safe with us. If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
          <br>
          <br>
          <p style="font-size: 14px; color: #777;">If you did not request this code, please ignore or delete this email.</p>
          <p style="font-size: 14px; color: #777; width: 100%; text-align: center;">Best regards,<br>Team AI Flavoured</p>
          <p style="font-size: 8px; color: #777; width: 100%; text-align: center;">© 2024 AI Flavoured</p>
        </div>
    </div>
    `

    sendEmail(email, 'Two Factor Authentication Code',html);

  }catch(e){
    console.log(e);
  }
}

export const sendPasswordResetEmail = async (name: string, email: string, token: string) => {
  const resetLink = `${process.env.WEBSITE_URL}/new-password?token=${token}`;
  try {
   const sendEmail = async (toEmail: string, subject: string, message: string) => {
      const params = {
        Destination: {
          ToAddresses: [toEmail]
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: message
            },
            Text: {
              Charset: "UTF-8",
              Data: message
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject
          }
        },
        Source: 'AI Flavoured <contact@aiflavoured.com>' 
      };
      try {
         const data = await sesClient.send(new SendEmailCommand(params));
         console.log(`Email sent: ${data.MessageId}`);
       } catch (err) {
         console.error(err);
       }
    };
    const html = `
       <div style="font-family: Arial, sans-serif; color: #333; width: 100%; max-width: 600px; margin: auto;">
        <div style="background: linear-gradient(135deg, rgba(247, 217, 238, 0.831), rgba(255, 255, 255, 0.831)), rgba(236, 234, 234, 0.831); padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://di6ccwru5n10a.cloudfront.net/public/logo/aiflavoured.png" alt="AI Flavoured Logo" style="max-width: 250px;">
          </div>

          <h1 style="color: #ff0786; font-size: 2.5rem;">Hello ${name},</h1>
          <p style="font-size: 1.2rem;">We received a request to reset your password. Click the link below to set a new password:</p>
          <p style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" style="background-color: #ff0786; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 1.2rem;">Reset Password</a>
          </p>
          <p style="font-size: 1.2rem;">If you did not request a password reset, please ignore or delete this email. If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
          <br>
          <p style="font-size: 14px; color: #777;">Best regards,<br>Team AI Flavoured</p>
          <p style="font-size: 14px; color: #777;">© 2024 AI Flavoured</p>
        </div>
      </div>
`;
      sendEmail(email, 'Password Reset Request', html);

  } catch (e) {
    console.log(e);
  }
}



export const sendVerificationEmail = async (name: string, email: string, token: string, callbackUrl?: string, plan?: string) => {
  try {
   const sendEmail = async (toEmail: string, subject: string, message: string) => {
      const params = {
        Destination: {
          ToAddresses: [toEmail]
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: message
            },
            Text: {
              Charset: "UTF-8",
              Data: message
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: subject
          }
        },
        Source: 'AI Flavoured <contact@aiflavoured.com>' 
      };
      try {
         const data = await sesClient.send(new SendEmailCommand(params));
         console.log(`Email sent: ${data.MessageId}`);
       } catch (err) {
         console.error(err);
       }
    };
    const html = `
    <div style="font-family: Arial, sans-serif; color: #333; width: 100%; max-width: 600px; margin: auto;">
      <div style="background: linear-gradient(135deg, rgba(247, 217, 238, 0.831), rgba(255, 255, 255, 0.831)), rgba(236, 234, 234, 0.831); padding: 20px; border-radius: 10px;">
         <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://aiflavoured.s3.ap-south-1.amazonaws.com/public/logo/aiflavoured.png" alt="AI Flavoured Logo" style="max-width: 250px;">
         </div>
         
         <h1 style="color: #ff0786; font-size: 2.5rem;">Hello ${name},</h1>
         <p style="font-size: 1.2rem;">Thank you for signing up with AI Flavoured! Please verify your email address by clicking the link below:</p>
         <p style="text-align: center; margin: 20px 0;">
            <a href="${process.env.WEBSITE_URL}/new-verification?token=${token}&callbackUrl=${callbackUrl || '/'}&plan=${plan}" style="background-color: #ff0786; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 1.2rem;">Verify Email</a>
         </p>
         <p style="font-size: 1.2rem;">If you did not sign up for this account, please ignore or delete this email. If you have any questions, feel free to contact our support team.</p>
         <br>
         <p style="font-size: 14px; color: #777;">Best regards,<br>Team AI Flavoured</p>
         <p style="font-size: 14px; color: #777;">© 2024 AI Flavoured</p>
      </div>
   </div>
   `
   sendEmail(email, 'Verify Your Email Address', html);

  } catch (e) {
    console.log(e);
  }
};
