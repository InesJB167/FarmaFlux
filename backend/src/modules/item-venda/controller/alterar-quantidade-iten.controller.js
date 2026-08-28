import { validarId } from "../../../utils/validar-id.js"
import {alterarQuantidadeItemService} from "../service/alterar-quantidade-item.service.js"

export const alterarQuantidadeItem = async (req,res)=>{
    try {
        const idVenda = Number(req.params.id)
        const verificarIdVenda = validarId(idVenda)
        const idItemVenda = Number(req.params.idItem)
        const verificarIdItem = validarId(idItemVenda)

        if(Object.keys(req.body).length === 0) return res.status(400).json({message:"Forneça os dados para a alteração da quantidade do item."})

        if(!idVenda || !verificarIdVenda ) return res.status(400).json({message:"ID venda inválido."})

        if(!idItemVenda || !verificarIdItem) return res.status(400).json({message:"ID item inválido."})

        const novaQuantidade = Number(req.body.novaQuantidade)

        if(!novaQuantidade || isNaN(novaQuantidade) || novaQuantidade <= 0) return res.status(400).json({message:"Quantidade fornecida inválida."})

        const alterar = await alterarQuantidadeItemService(idItemVenda,idVenda,novaQuantidade)

        return res.status(alterar.status).json(alterar)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}