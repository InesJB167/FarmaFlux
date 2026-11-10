import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import {verificarSubscricaoLicensa} from "../../../middlewares/verificar-licenca.middleware.js"
import { criarVenda } from "../controller/criar-venda.controller.js"
import { buscarVendaPorId } from "../controller/buscar-venda-porId.controller.js"
import { listarTodasVendas } from "../controller/listar-vendas.controller.js"
import { alterarStatusVenda } from "../controller/alterar-status-venda.controller.js"
import { registrarItensVenda } from "../../item-venda/controller/registrar-itens-venda.controller.js"
import { listarItensVenda } from "../../item-venda/controller/listar-itens-venda.controller.js"
import { alterarQuantidadeItem } from "../../item-venda/controller/alterar-quantidade-iten.controller.js"
import { removerItemDaVenda } from "../../item-venda/controller/remover-item-venda.controller.js"
import { efetuarPagamento } from "../../pagamento/controller/efetuar-pagamento.controller.js"
import { finalizarVenda } from "../controller/finalizar-venda.controller.js"
import { gerarComprovativoVenda } from "../controller/gerar-comprovativo-venda.controller.js"
import { gerarArquivoPdfVenda } from "../controller/gerar-comprovativo-pdf.controller.js"
const route = express.Router()

route.post("/" ,autenticar, verificarUtilizadorAtivo, verificarSubscricaoLicensa ,criarVenda)
route.get("/" ,autenticar, verificarUtilizadorAtivo, listarTodasVendas)
route.get("/:id" ,autenticar, verificarUtilizadorAtivo, buscarVendaPorId)
route.patch("/:id" ,autenticar, verificarUtilizadorAtivo, verificarSubscricaoLicensa,alterarStatusVenda)

//rotas para os itens da venda
route.post("/:id/item" ,autenticar, verificarUtilizadorAtivo, verificarSubscricaoLicensa,registrarItensVenda)
route.get("/:id/item" ,autenticar, verificarUtilizadorAtivo, verificarSubscricaoLicensa,listarItensVenda)
route.patch("/:id/item/:idItem" ,autenticar, verificarUtilizadorAtivo, verificarSubscricaoLicensa,alterarQuantidadeItem)
route.delete("/:id/item/:idItem" ,autenticar, verificarUtilizadorAtivo, verificarSubscricaoLicensa,removerItemDaVenda)

//rota para o pagamento
route.post("/:id/pagamento/" ,autenticar, verificarUtilizadorAtivo, verificarSubscricaoLicensa,efetuarPagamento)

route.post("/:id/finalizar" ,autenticar ,verificarUtilizadorAtivo, verificarSubscricaoLicensa,finalizarVenda)
route.post("/:id/comprovativo" ,autenticar ,verificarUtilizadorAtivo, verificarSubscricaoLicensa,gerarComprovativoVenda)
route.get("/:id/comprovativo/pdf/" ,autenticar ,verificarUtilizadorAtivo, verificarSubscricaoLicensa,gerarArquivoPdfVenda)

export default route