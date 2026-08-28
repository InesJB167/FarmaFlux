import { validarId } from "../../../utils/validar-id.js"
import { removerItemVendaService } from "../service/remover-item-venda.service.js"

export const removerItemDaVenda = async (req, res) => {
    try {
        const idItem = Number(req.params.idItem)
        const idVenda = Number(req.params.id)

        if(!validarId(idVenda)) return res.status(400).json({message:"ID venda inválido."}) 
        if(!validarId(idItem)) return res.status(400).json({message:"ID item inválido."})
        
        const removerItem = await removerItemVendaService(idItem,idVenda)
        return res.status(removerItem.status).json(removerItem)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}