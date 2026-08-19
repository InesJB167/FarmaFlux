import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { registrarBarcode } from "../controller/registrar-barcode.controller.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
const route = express.Router()

route.post("/" ,autenticar ,verificarUtilizadorAtivo ,authorization(["ADMIN","GERENTE"]), registrarBarcode)

//!todos users podem listar barcodes, e pesquisa-los mas nem todos podem edita-los 

export default route