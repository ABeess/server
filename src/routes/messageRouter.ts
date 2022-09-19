import express from 'express';
import MessageController from '../controller/messageController';
const Router = express.Router();

Router.get('/get-message', MessageController.getMessage);
Router.get('/getUser', MessageController.getAllUser);

export default Router;
