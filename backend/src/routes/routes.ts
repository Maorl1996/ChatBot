import express from "express";
import { postMessage } from "../handlers/handlers";
const router = express.Router();

router.post("/message/:userId", postMessage);

export default router;
