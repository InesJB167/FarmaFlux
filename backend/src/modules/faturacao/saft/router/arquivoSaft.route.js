import express from "express"
import { gerarArquivoSaft } from "../controller/gerarArquivoSaft.controller.js"
const route = express.Router()

route.post("/" ,gerarArquivoSaft)
export default route