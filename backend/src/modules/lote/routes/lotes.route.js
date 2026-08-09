import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { registrarLote } from "../controller/registrar-lote.controller.js"
import { buscarLotes} from "../controller/listar-lotes.controller.js"
import { buscarLotePorId } from "../controller/buscar-lote-porId.controller.js"
const router = express.Router()

router.post("/" ,autenticar, verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), registrarLote)
router.get("/" ,autenticar, verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), buscarLotes)
router.get("/:id" ,autenticar, verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), buscarLotePorId)

export default router