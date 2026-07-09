import express from "express"
import { criarUtilizador } from "../controller/criar-utilizador.controller.js"
const router = express.Router()

router.post("/create" ,criarUtilizador)
export default router

