import express from "express"
import { gerarCodigoFaturaService } from "./gerarCodigoFatura.service.js"
const route = express.Router()

const gerarCodigoFatura = async(req,res)=>{
    try {
        const id = 2
        const gerarCodigo = await gerarCodigoFaturaService(id)
        return res.status(gerarCodigo.status).json(gerarCodigo)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}

route.post("/gerarCodigo" ,gerarCodigoFatura)
export default route