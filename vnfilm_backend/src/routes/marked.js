import express from "express";
import * as markedController from "../controller/marked.js";
import { checkAuthAdmin } from "../middlewares/check-auth.js";
const router = express.Router();

router.post("/add", markedController.Marker);
router.delete("/unmarked", markedController.Unmarked);
router.get("/check", markedController.getOneMarked)
router.get("/listmarked/:user_id", markedController.getAllByUser)
export default router;
