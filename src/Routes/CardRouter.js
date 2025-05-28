import express from 'express'
import CardController from '../controllers/CardController.js';
const Router = express.Router();

Router.post('/card/new/:word', CardController.GenerateCard)

export default Router;
