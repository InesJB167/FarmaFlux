import { validarId } from "../../../utils/validar-id.js";
import {registrarItensVendaService} from "../service/registrar-itens-venda.service.js"

export const registrarItensVenda = async (req,res) =>{
    try {
    
        const vendaId = Number(req.params.id)
        const verificarIdVenda = validarId(vendaId)

        if(Object.keys(req.body).length === 0) return res.status(400).json({message:"Informe os itens a serem adicionados."})

        if(!vendaId || !verificarIdVenda) return res.status(400).json({message:"ID venda inválido."})
        
        const medicamentoId = Number(req.body.medicamentoId)
        const verificarIdMedicamento = validarId(medicamentoId)

        if(!verificarIdMedicamento) return res.status(400).json({message:"ID medicamento inválido."})

        const quantidade = Number(req.body.quantidade)
         
        if(!quantidade || isNaN(quantidade) || quantidade <= 0) {
            return res.status(400).json({message:"Quantidade inválida."})
        }
        
        const registrarItens = await registrarItensVendaService(vendaId,medicamentoId,quantidade)
        if(!registrarItens.success) return res.status(registrarItens.status).json(registrarItens)

        return res.status(registrarItens.status).json(registrarItens)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}