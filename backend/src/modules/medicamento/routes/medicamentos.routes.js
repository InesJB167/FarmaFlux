import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { registrarMedicamento } from "../controller/registrar-medicamento.controller.js"
const router = express.Router()

router.post("/" ,autenticar, verificarUtilizadorAtivo, registrarMedicamento)

export default router