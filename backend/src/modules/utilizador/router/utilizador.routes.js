import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarStatusConta } from "../../../middlewares/account-status.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { criarUtilizador } from "../controller/criar-utilizador.controller.js"
import { listarUtilizador } from "../controller/listar-utilizador.controller.js"
import { buscarUtilizador } from "../controller/buscar-utilizador.controller.js"
import { buscarUtilizadorPorNome } from "../controller/buscar-utilizador-username.controller.js"
import { atualizarUtilizador } from "../controller/atualizar-utilizador.controller.js"
import { alterarStatusUtilizador } from "../controller/alterar-status-utilizador.controller.js"
import { alteralRoleUtilizador } from "../controller/alterar-role-utilizador.controller.js"

const router = express.Router()

router.post("/"  ,criarUtilizador)

router.get("/" ,autenticar, verificarUtilizadorAtivo ,authorization(["ADMIN"]), listarUtilizador)

//lembre-se o search vem sempre primeiro que o :id
router.get("/search" ,autenticar , verificarUtilizadorAtivo, authorization(["ADMIN"]), buscarUtilizadorPorNome)

router.get("/:id" ,autenticar ,verificarUtilizadorAtivo ,authorization(["ADMIN"]), buscarUtilizador)

//endpoint que permite apenas o user da propria conta alterar o seu perfil
router.patch("/" ,autenticar ,verificarUtilizadorAtivo, atualizarUtilizador)

router.patch("/:id/status" ,autenticar ,verificarUtilizadorAtivo, authorization(["ADMIN"]), alterarStatusUtilizador )

router.patch("/:id/role" ,autenticar ,verificarUtilizadorAtivo ,authorization(["ADMIN"]), alteralRoleUtilizador)

export default router

