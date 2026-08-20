import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { registrarBarcode } from "../controller/registrar-barcode.controller.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import { encontrarBarcodePorId } from "../controller/buscar-barcode-porId.controller.js"
import { listarBarcodesAtivos } from "../controller/listar-barcode.controller.js"
import { encontrarBarcodePeloCodigo } from "../controller/buscar-barcode-peloCodigo.controller.js"
const route = express.Router()

route.post("/" ,autenticar ,verificarUtilizadorAtivo ,authorization(["ADMIN","GERENTE"]), registrarBarcode)

//!todos users podem listar barcodes, e pesquisa-los mas nem todos podem edita-los 
route.get("/search", autenticar, verificarUtilizadorAtivo ,encontrarBarcodePeloCodigo)
route.get("/:id", autenticar,verificarUtilizadorAtivo,encontrarBarcodePorId)
route.get("/", autenticar, verificarUtilizadorAtivo ,listarBarcodesAtivos)

export default route