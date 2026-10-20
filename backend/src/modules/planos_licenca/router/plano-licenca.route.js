import express from "express"
import { registrarPlanoLicenca } from "../controller/registrar-plano-licenca.controller.js"
const route = express.Router()

route.post("/",registrarPlanoLicenca)
export default route