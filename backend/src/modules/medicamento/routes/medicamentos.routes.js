import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { registrarMedicamento } from "../controller/registrar-medicamento.controller.js"
import { listarMedicamentos } from "../controller/listar-medicamentos.controller.js"
const router = express.Router()

router.post("/" ,autenticar, verificarUtilizadorAtivo, registrarMedicamento)
router.get("/" ,autenticar, verificarUtilizadorAtivo, listarMedicamentos)

export default router