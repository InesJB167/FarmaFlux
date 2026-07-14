import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarStatusConta } from "../../../middlewares/account-status.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { criarUtilizador } from "../controller/criar-utilizador.controller.js"
import { listarUtilizador } from "../controller/listar-utilizador.controller.js"
import { buscarUtilizador } from "../controller/buscar-utilizador.controller.js"

const router = express.Router()

router.post("/"  ,criarUtilizador)

router.get("/" ,autenticar, verificarUtilizadorAtivo ,authorization(["ADMIN"]), listarUtilizador)

router.get("/:id" ,autenticar ,verificarUtilizadorAtivo ,authorization(["ADMIN"]), buscarUtilizador)


export default router

