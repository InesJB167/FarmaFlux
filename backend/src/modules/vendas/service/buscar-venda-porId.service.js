import {buscarVendaPorId} from "../repository/buscarVendaPorId.js"

export const buscarVendaPorIdService = async (idVenda) =>{
    const encontrarVenda = await buscarVendaPorId(idVenda)

    if(!encontrarVenda) return{
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    return {
        success:  true,
        status: 200,
        message: "Venda encontrada.",
        data: encontrarVenda
    }
}