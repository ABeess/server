import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

class MyTransporter {
  transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor(token: string) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'Gmail',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_API_REFRESHTOKEN,
        accessToken: token,
      },
    });
  }
}

export default MyTransporter;
