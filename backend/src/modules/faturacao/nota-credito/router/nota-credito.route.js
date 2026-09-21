import express from "express"
import { gerarNotaDeCredito } from "../controller/gerarNotaCredito.controller.js"
import { autenticar } from "../../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../../middlewares/check-active-user.middleware.js"

const route = express.Router()

route.post("/:idVenda",autenticar, verificarUtilizadorAtivo,gerarNotaDeCredito)
export default route