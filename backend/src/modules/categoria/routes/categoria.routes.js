import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { criarCategoria } from "../controllers/criar-categoria.controller.js"
import { listarCategoria } from "../controllers/listar-categoria.controller.js"
import { buscarCategoriaPorId } from "../controllers/buscar-categoria-porId.controller.js"
import { editarCategoria } from "../controllers/editar-categoria.controller.js"
const router = express.Router()

router.post("/create" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), criarCategoria)

router.get("/" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), listarCategoria)

router.get("/:id" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), buscarCategoriaPorId)

router.patch("/:id" ,autenticar ,verificarUtilizadorAtivo ,authorization(["ADMIN","GERENTE"]), editarCategoria)

export default router