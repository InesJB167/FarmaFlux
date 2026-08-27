import { validarId } from "../../../utils/validar-id.js"
import {listarItensVendaService} from "../service/listar-itens-venda.service.js"

export const listarItensVenda = async (req,res)=>{
    try {
        const idVenda = Number(req.params.id)
        const verificarIdVenda = validarId(idVenda)

        if(!idVenda || !verificarIdVenda) return res.status(400).json({message:"ID venda inválido."})
        
        const listarItens = await listarItensVendaService(idVenda)

        return res.status(listarItens.status).json(listarItens)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}