import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { consultarStockDeUmMedicamento } from "../controller/consultar-stock-de-um-medicamento.controller.js"
import { listarMedicamentosEmStock } from "../controller/listar-medicamentos-em-stock.controller.js"
import { listarLotesPorMedicamentosNoStock } from "../controller/consultar-quantidade-medicamento-por-lote.controller.js"
const route = express.Router()

route.get("/" ,autenticar,verificarUtilizadorAtivo,listarMedicamentosEmStock)
route.get("/search", autenticar,verificarUtilizadorAtivo,listarLotesPorMedicamentosNoStock)
route.get("/:id", autenticar,verificarUtilizadorAtivo,consultarStockDeUmMedicamento)

export default route