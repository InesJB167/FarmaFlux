import express from "express"
import { autenticar } from "../../../middlewares/auth.middleware.js"
import { authorization } from "../../../middlewares/authorize.middleware.js"
import { criarUtilizador } from "../controller/criar-utilizador.controller.js"
import { listarUtilizador } from "../controller/listar-utilizador.controller.js"

const router = express.Router()

router.post("/create" ,autenticar, authorization(["ADMIN"]),criarUtilizador)

router.get("/list" ,autenticar, authorization(["ADMIN"]), listarUtilizador)

export default router

