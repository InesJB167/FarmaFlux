import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { registrarPlanoLicenca } from "../controller/registrar-plano-licenca.controller.js"
const route = express.Router()

route.post("/",autenticar, authorization(["SUPER_ADMIN"]), registrarPlanoLicenca)
export default route