import { validarId } from "../../../utils/validar-id.js";
import {addItensVendaService} from "../service/add-itens-venda.service.js"

export const addItensVenda = async (req,res) =>{
    try {
        /**
         * ?essa função deve permitir adicionar mais de um item a venda 
         * *como permitir que a sejam adicionados mais de um item a venda??
         * *os itens podem ser adicionados em um objecto itens-venda ,o mesmo vai ter duas propriedades
         * *cada item deve ter um preço específico...este preço virá do medicamento,certo ?? 
         * *logo aqui apenas pego os itens os valores pego dos medicamentos
         */

        const vendaId = req.body.vendaId
        const verificarIdVenda = validarId(vendaId)

        if(!verificarIdVenda) return res.status(400).json({message:"ID venda inválido."})
        
        const adicionarItens = await addItensVendaService(vendaId)
        if(!adicionarItens.success) return res.status(adicionarItens.status).json(adicionarItens)

        return res.json(adicionarItens)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}