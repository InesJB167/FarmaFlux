import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { criarCategoria } from "../controllers/criar-categoria.controller.js"
import { listarCategoria } from "../controllers/listar-categoria.controller.js"
const router = express.Router()

router.post("/create" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), criarCategoria)

router.get("/" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), listarCategoria)

export default router