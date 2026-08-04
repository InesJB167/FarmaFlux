import {listarFornecedoresService} from "../service/listar-fornecedores.service.js"

export const listarFornecedores = async (req, res) =>{
    try {
        const listarTodosFornecedores = await listarFornecedoresService()
        return res.status(listarTodosFornecedores.status).json(listarTodosFornecedores)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}