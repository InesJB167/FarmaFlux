import { validarId } from "../../../utils/validar-id.js"
import {eliminarFornecedorService} from "../service/deletar-fornecedor.service.js"

export const eliminarFornecedor = async (req, res) =>{
    try {
        const id = Number(req.params.id)
        const idValidado = validarId(id)

        if(!idValidado) return res.status(400).json({message:"ID inválido."})

        const deletarFornecedor = await eliminarFornecedorService(id)
        
        if(!deletarFornecedor.success) return res.status(deletarFornecedor.status).json(deletarFornecedor)

        return res.status(deletarFornecedor.status).json(deletarFornecedor)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}