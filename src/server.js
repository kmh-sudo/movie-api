import 'dotenv/config';
import cors from "cors";
import { bot } from './bot.js';
import app from './app.js';   
import connectDB from './config/database.js';
import errorHandler from './middlewares/errorHadler.js';
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());

app.get("/", (req, res) => res.json({ status: "ok buddy"}));

app.use(errorHandler);

bot.launch(); 
console.log("bot started")

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
