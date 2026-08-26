import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { criarVenda } from "../controller/criar-venda.controller.js"
const route = express.Router()

route.post("/" ,autenticar, verificarUtilizadorAtivo,criarVenda)

export default route