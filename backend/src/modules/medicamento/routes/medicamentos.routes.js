import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { registrarMedicamento } from "../controller/registrar-medicamento.controller.js"
import { listarMedicamentos } from "../controller/listar-medicamentos.controller.js"
import { buscarMedicamentoPorId } from "../controller/buscar-medicamento-porId.controller.js"
import { pesquisandoMedicamentos } from "../controller/pesquisar-medicamentoPor.controller.js"
//import { buscarMedicamentoPorNome } from "../controller/buscar-medicamento-porNome.controller.js"
const router = express.Router()

router.post("/" ,autenticar, verificarUtilizadorAtivo, registrarMedicamento)
router.get("/" ,autenticar, verificarUtilizadorAtivo, listarMedicamentos)
//router.get("/search" ,autenticar, verificarUtilizadorAtivo, buscarMedicamentoPorNome)
router.get("/search" ,autenticar, verificarUtilizadorAtivo, pesquisandoMedicamentos)
router.get("/:id" ,autenticar, verificarUtilizadorAtivo, buscarMedicamentoPorId)

export default router