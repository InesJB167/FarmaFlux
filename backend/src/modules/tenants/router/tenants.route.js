import express from "express";
import { autenticar } from "../../../middlewares/auth.middleware.js";
import { authorization } from "../../../middlewares/authorize.middleware.js";
import { criarTenant } from "../controller/criar-tenant.controller.js"
import { registrarPagamento } from "../../pagamento_licenca/controller/registrar-pagamento.controller.js";
import { gerarCodigoAtivacao } from "../../codigos_ativacao/controller/gerar-codigo-ativacao.controller.js";
import { estenderSubscricao } from "../controller/estenderSubscricaoTenant.controller.js";
import { suspenderTenant } from "../controller/suspender-tenant.controller.js";
const route = express.Router()

route.post("/", autenticar, authorization(["SUPER_ADMIN"]), criarTenant)
route.post("/:id/codigo-ativacao/", autenticar, authorization(["SUPER_ADMIN"]), gerarCodigoAtivacao)
route.post("/:id/pagamento", autenticar, authorization(["SUPER_ADMIN"]), registrarPagamento)
route.post("/:id/renovar-subscricao", autenticar, authorization(["SUPER_ADMIN"]), estenderSubscricao)
route.post("/:id/suspender-subscricao/", autenticar, authorization(["SUPER_ADMIN"]), suspenderTenant)

export default route