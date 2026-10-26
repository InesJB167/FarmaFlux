import express from "express";
import { verificarStatusConta } from "../../middlewares/account-status.middleware.js";
import { login } from "./auth.controller.js";
import { verificarSubscricaoLicensa } from "../../middlewares/verificar-licenca.middleware.js";
const router = express.Router();

router.post("/",verificarSubscricaoLicensa, verificarStatusConta, login)
export default router