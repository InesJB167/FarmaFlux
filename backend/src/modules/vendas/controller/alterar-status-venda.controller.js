import { validarId } from "../../../utils/validar-id.js"
import {alterarStatusVendaService} from "../service/alterar-status-venda.service.js"

export const alterarStatusVenda = async(req,res)=>{
    try {

        const idVenda = Number(req.params.id)
        const verificarIdVenda = validarId(idVenda)

        if(!verificarIdVenda) return res.status(400).json({message: "ID venda inválido."})

        const statusVenda = ["PARKED","DRAFT","COMPLETED","CANCELLED"]
        const novoStatus = req.body.novoStatus?.trim()

        if(!novoStatus || !statusVenda.includes(novoStatus)) {
            return res.status(400).json({message: "Status venda inválido."})
        }

        const mudandoStatus = await alterarStatusVendaService(idVenda,novoStatus)

        return res.status(mudandoStatus.status).json(mudandoStatus)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}