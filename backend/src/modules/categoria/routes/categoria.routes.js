import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import {verificarSubscricaoLicensa} from "../../../middlewares/verificar-licenca.middleware.js"
import { criarCategoria } from "../controllers/criar-categoria.controller.js"
import { listarCategoria } from "../controllers/listar-categoria.controller.js"
import { buscarCategoriaPorId } from "../controllers/buscar-categoria-porId.controller.js"
import { editarCategoria } from "../controllers/editar-categoria.controller.js"
import { deletarCategoria } from "../controllers/deletar-categoria.controller.js"
const router = express.Router()

router.post("/" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), verificarSubscricaoLicensa,criarCategoria)

router.get("/" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), listarCategoria)

router.get("/:id" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), buscarCategoriaPorId)

router.patch("/:id" ,autenticar ,verificarUtilizadorAtivo ,authorization(["ADMIN","GERENTE"]),verificarSubscricaoLicensa, editarCategoria)

router.delete("/:id" ,autenticar ,verificarUtilizadorAtivo ,authorization(["ADMIN","GERENTE"]),verificarSubscricaoLicensa, deletarCategoria)

export default router