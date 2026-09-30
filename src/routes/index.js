
import { Router } from "express";
import movieRoute from "./movieRoute.js";

const router = Router();
router.use("/", movieRoute);

export default router;