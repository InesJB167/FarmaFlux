import { validarId } from "../../../utils/validar-id.js"
import { buscarFornecedorPorIdService} from "../service/buscar-fornecedor-porId.service.js"

export const buscarFornecedorPorId = async (req, res) =>{
    try {
        const id = Number(req.params.id)

        const verificarId = validarId(id)
        if(!verificarId) return res.status(400).json({message:"ID inválido"})

        const encontrarFornecedor = await buscarFornecedorPorIdService(id)

        if(!encontrarFornecedor.success) return res.status(encontrarFornecedor.status).json(encontrarFornecedor)

        return res.status(encontrarFornecedor.status).json(encontrarFornecedor)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}