import express from "express"
import { gerarArquivoSaft } from "../controller/gerarArquivoSaft.controller.js"
import { autenticar } from "../../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../../middlewares/check-active-user.middleware.js"
const route = express.Router()

route.post("/" ,autenticar,verificarUtilizadorAtivo, gerarArquivoSaft)
export default route