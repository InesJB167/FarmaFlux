import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { criarLocalizacao } from "../controllers/criar-localizacao.controller.js"
import { listarLocalizacoes } from "../controllers/listar-localizacoes.controller.js"
import { buscarLocalizacaoPorId } from "../controllers/buscar-localizacaoPorId.controller.js"
import { alterarLocalizacao } from "../controllers/atualizar-localizacao.controller.js"
import { deletarLocalizacao } from "../controllers/deletar-loclizacao.controller.js"
const router = express.Router()

router.post("/" , autenticar, verificarUtilizadorAtivo , authorization(["ADMIN","GERENTE"]), criarLocalizacao)
router.get("/" , autenticar, verificarUtilizadorAtivo , authorization(["ADMIN","GERENTE"]), listarLocalizacoes)
router.get("/:id" , autenticar, verificarUtilizadorAtivo , authorization(["ADMIN","GERENTE"]), buscarLocalizacaoPorId)
router.patch("/:id" , autenticar, verificarUtilizadorAtivo , authorization(["ADMIN","GERENTE"]), alterarLocalizacao)
router.delete("/:id" , autenticar, verificarUtilizadorAtivo , authorization(["ADMIN","GERENTE"]), deletarLocalizacao)

export default router