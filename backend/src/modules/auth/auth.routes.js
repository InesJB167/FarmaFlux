import express from "express";
import { verificarStatusConta } from "../../middlewares/account-status.middleware.js";
import { login } from "./auth.controller.js";
const router = express.Router();

router.post("/", verificarStatusConta, login)
export default router