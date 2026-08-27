import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { criarVenda } from "../controller/criar-venda.controller.js"
import { buscarVendaPorId } from "../controller/buscar-venda-porId.controller.js"
import { listarTodasVendas } from "../controller/listar-vendas.controller.js"
import { alterarStatusVenda } from "../controller/alterar-status-venda.controller.js"
import { registrarItensVenda } from "../../item-venda/controller/registrar-itens-venda.controller.js"
const route = express.Router()

route.post("/" ,autenticar, verificarUtilizadorAtivo,criarVenda)
route.get("/" ,autenticar, verificarUtilizadorAtivo, listarTodasVendas)
route.get("/:id" ,autenticar, verificarUtilizadorAtivo, buscarVendaPorId)
route.patch("/:id" ,autenticar, verificarUtilizadorAtivo, alterarStatusVenda)

//rotas para os itens da venda
route.post("/:id/item" ,autenticar, verificarUtilizadorAtivo, registrarItensVenda)

export default route