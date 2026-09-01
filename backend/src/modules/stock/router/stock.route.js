import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { consultarStockDeUmMedicamento } from "../controller/consultar-stock-de-um-medicamento.controller.js"
const route = express.Router()

route.get("/:id", autenticar,verificarUtilizadorAtivo,consultarStockDeUmMedicamento)

export default route