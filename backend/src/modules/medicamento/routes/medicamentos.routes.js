import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { registrarMedicamento } from "../controller/registrar-medicamento.controller.js"
import { listarMedicamentos } from "../controller/listar-medicamentos.controller.js"
import { buscarMedicamentoPorId } from "../controller/buscar-medicamento-porId.controller.js"
import { pesquisandoMedicamentos } from "../controller/pesquisar-medicamentoPor.controller.js"
import { atualizarMedicamento } from "../controller/atualizar-medicamento.controller.js"
import { deletarMedicamento } from "../controller/deletar-medicamento.controller.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import {verificarSubscricaoLicensa} from "../../../middlewares/verificar-licenca.middleware.js"
const router = express.Router()

router.post("/" ,autenticar, verificarUtilizadorAtivo, verificarSubscricaoLicensa,registrarMedicamento)

router.get("/search" ,autenticar, verificarUtilizadorAtivo, pesquisandoMedicamentos)
router.get("/:id" ,autenticar, verificarUtilizadorAtivo, buscarMedicamentoPorId)

router.get("/" ,autenticar, verificarUtilizadorAtivo, listarMedicamentos)

router.patch("/:id" ,autenticar , verificarUtilizadorAtivo,authorization(["ADMIN","GERENTE"]),verificarSubscricaoLicensa, atualizarMedicamento)
router.delete("/:id" ,autenticar, verificarUtilizadorAtivo,authorization(["ADMIN","GERENTE"]),verificarSubscricaoLicensa, deletarMedicamento)


export default router