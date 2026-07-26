import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { criarLocalizacao } from "../controllers/criar-localizacao.controller.js"
import { listarLocalizacoes } from "../controllers/listar-localizacoes.controller.js"
const router = express.Router()

router.post("/" , autenticar, verificarUtilizadorAtivo , authorization(["ADMIN","GERENTE"]), criarLocalizacao)
router.get("/" , autenticar, verificarUtilizadorAtivo , authorization(["ADMIN","GERENTE"]), listarLocalizacoes)

export default router