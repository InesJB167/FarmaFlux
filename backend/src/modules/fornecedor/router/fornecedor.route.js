import express from "express";
import { autenticar } from "../../../middlewares/auth.middleware.js";
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js";
import { authorization } from "../../../middlewares/authorize.middleware.js";
import { registrarNovoFornecedor } from "../controller/registrar-fornecedor.controller.js";
const router = express.Router()

router.post("/" ,autenticar,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), registrarNovoFornecedor)

export default router