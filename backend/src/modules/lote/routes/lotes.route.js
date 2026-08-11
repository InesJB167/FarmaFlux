import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { registrarLote } from "../controller/registrar-lote.controller.js"
import { buscarLotes} from "../controller/listar-lotes.controller.js"
import { buscarLotePorId } from "../controller/buscar-lote-porId.controller.js"
import { editarLote } from "../controller/editar-lote.controller.js"
import { eliminarlote } from "../controller/deletar-lote.controller.js"
const router = express.Router()

router.post("/" ,autenticar, verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), registrarLote)
router.get("/" ,autenticar, verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), buscarLotes)
router.get("/:id" ,autenticar, verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), buscarLotePorId)
router.patch("/:id" ,autenticar, verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), editarLote)
router.delete("/:id" ,autenticar, verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), eliminarlote)

export default router