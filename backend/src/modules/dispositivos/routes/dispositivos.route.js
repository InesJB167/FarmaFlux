import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { verificarUtilizadorAtivo } from "../../../middlewares/check-active-user.middleware.js"
import   {authorization} from "../../../middlewares/authorize.middleware.js" 
import { ativarDispositivo } from "../controller/ativar-dispositivo.controller.js"
import { renovarTokenDipositivo } from "../controller/renovar-token-dispositivo.controller.js"
const route = express.Router()

route.post("/", autenticar,verificarUtilizadorAtivo, authorization(["SUPER_ADMIN"]), ativarDispositivo)

route.post("/renovar-token-dispositivo", renovarTokenDipositivo)

export default route