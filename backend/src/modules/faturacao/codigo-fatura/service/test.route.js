import express from "express"
import { gerarCodigoFaturaService } from "./gerarCodigoFatura.service.js"
import { gerarAssinaturaHashDeFatura } from "../../assinatura/service/gerarAssinaturaHash.service.js"
import { gerarNotaCreditoService } from "../../nota-credito/service/gerarNotaCredito.service.js"
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


const gerarAssinatura = async(req,res)=>{
    try {
        const id = 3
        const dadosVenda ={
            idVenda: 2,
            total_bruto: 2200,
            total_desconto: 2000
        }
        const assinatura = await gerarAssinaturaHashDeFatura(id,dadosVenda)
        return res.status(assinatura.status).json(assinatura)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}

const gerarNotaDeCredito = async(req,res)=>{
    try {
        const id = 1
        const idUser = 1
        const motivo = "DESCONTO_POS_VENDA"
        const valorAnulado = 220
        const notasCredito = await gerarNotaCreditoService(id,motivo,valorAnulado,idUser)
        return res.status(notasCredito.status).json(notasCredito)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}

route.post("/gerarCodigo" ,gerarCodigoFatura)
route.patch("/assinatura",gerarAssinatura)
route.post("/nota-credito", gerarNotaDeCredito)
export default route