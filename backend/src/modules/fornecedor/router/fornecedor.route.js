import express from "express";
import { autenticar } from "../../../middlewares/auth.middleware.js";
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js";
import { authorization } from "../../../middlewares/authorize.middleware.js";
import { registrarNovoFornecedor } from "../controller/registrar-fornecedor.controller.js";
import { listarFornecedores } from "../controller/listar-fornecedores.controller.js";
import { buscarFornecedorPorId } from "../controller/buscar-fornecedor-porId.controller.js";
import { editarFornecedor } from "../controller/atualizar-fornecedor.controller.js";
import { eliminarFornecedor } from "../controller/deletar-fornecedor.controller.js";
const router = express.Router()

router.post("/" ,autenticar,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), registrarNovoFornecedor)
router.get("/" ,autenticar,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), listarFornecedores)
router.get("/:id" ,autenticar,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), buscarFornecedorPorId)
router.patch("/:id" ,autenticar,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), editarFornecedor)
router.delete("/:id" ,autenticar,verificarUtilizadorAtivo, authorization(["ADMIN","GERENTE"]), eliminarFornecedor)

export default router