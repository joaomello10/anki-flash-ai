import express from 'express'
const Router = express.Router();
import BlacklistController from '../controllers/BlacklistController.js';

Router.post("/word/blacklist/add/:word", BlacklistController.addWordToBlacklist)
Router.delete("/word/blacklist/delete/:word", BlacklistController.deleteWordFromBlacklist)

export default Router;
