import {validarId} from "../../../../utils/validar-id.js"
import { gerarNotaCreditoService } from "../service/gerarNotaCredito.service.js"

export const gerarNotaDeCredito = async(req,res)=>{
    try {
        const idUser = req.user.id
        const idVenda = Number(req.params.idVenda)
        if(!validarId(idVenda)) return res.status(400).json({message:"ID venda inválido."})
        
        const motivo = req.body.motivo?.toUpperCase()
        const valorAnulado = Number(req.body.valorAnulado)

        motivo.toUpperCase()
        if(!motivo.trim()) return res.status(400).json({message:"Informe o motivo para a anulação/retificação da venda/fatura anterior."})

        if(!valorAnulado || isNaN(valorAnulado)) return res.status(400).json({message:"Valor anulado inválido."})

        const novaNotaCredito = await gerarNotaCreditoService(idVenda,motivo,valorAnulado,idUser)

        return res.status(novaNotaCredito.status).json(novaNotaCredito)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}