import express from "express"
import { registrarFarmacia } from "../controller/registrar-farmacia.controller.js"
const route = express.Router()

route.post("/",registrarFarmacia)

export default route