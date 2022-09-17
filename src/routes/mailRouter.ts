import express from 'express';
import { google } from 'googleapis';
import { StatusCodes } from 'http-status-codes';
import { HandlingError } from '../lib/Errors';
import authService from '../service/authService';
import redis from '../utils/redis';
import MyTransporter from '../utils/transporter';

const Router = express.Router();

Router.post('/send-mail', async (req, res) => {
  const { email } = req.body;
  try {
    await authService.mailerService(email);

    const oauth2Client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    });

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_API_REFRESHTOKEN,
    });

    const { token } = await oauth2Client.getAccessToken();
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json({
        code: StatusCodes.FORBIDDEN,
        message: 'No token',
      });
    }

    const code = Math.floor(Math.random() * 1000000);

    const html = `
      <h1>Hello ${email}</h1>
      <p>Your code is ${code}</p>
    `;

    const transporter = new MyTransporter(token).transporter;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Confirm your email',
      html: html,
    });
    await redis.set(`email:${email}`, code, 'EX', 60 * 10);

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: 'Mail sent',
    });
  } catch (error) {
    return new HandlingError(res, error);
  }
});

export default Router;
