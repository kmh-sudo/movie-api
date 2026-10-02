import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import  errorHandler  from "./middlewares/errorHadler.js";
const app = express();

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => res.json({ status: "ok buddy"}));

app.use("/movie", routes);   
app.use(errorHandler);
export default app;