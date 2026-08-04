import {buscarFornecedorPorId} from "../repository/buscarFornecedorPorId.js"

export const buscarFornecedorPorIdService = async (id) =>{
    const fornecedor = await buscarFornecedorPorId(id)

    if(!fornecedor) return{
        success: false,
        status: 404,
        message: "Fornecedor não encontrado."
    }

    return {
        success: true,
        status: 200,
        message: "Fornecedor encontrado.",
        data: fornecedor
    }
}