import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { consultarStockDeUmMedicamento } from "../controller/consultar-stock-de-um-medicamento.controller.js"
import { listarMedicamentosEmStock } from "../controller/listar-medicamentos-em-stock.controller.js"
import { listarLotesPorMedicamentosNoStock } from "../controller/consultar-quantidade-medicamento-por-lote.controller.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { consultarStockTotal } from "../controller/consultar-stock-total.controller.js"
const route = express.Router()

//lista os medicamentos disponiveis a venda e suas quantidades
route.get("/" ,autenticar,verificarUtilizadorAtivo,listarMedicamentosEmStock)

//apresenta os lotes válidos de um determinado medicamento ,com suas quantidades e status
route.get("/search", autenticar,verificarUtilizadorAtivo,listarLotesPorMedicamentosNoStock)

//apresenta todos os lotes no stock ,vencidos e válidos
route.get("/total", autenticar,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]),consultarStockTotal)

//consulta a quantidade de um determinado medicamento
route.get("/:id", autenticar,verificarUtilizadorAtivo,consultarStockDeUmMedicamento)

export default route