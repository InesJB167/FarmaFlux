import {buscarLotePorId} from "../repository/buscarLotePorId.js"

export const buscarLotePorIdService = async (idLote) =>{
    const encontrarLote = await buscarLotePorId(idLote)

    if(!encontrarLote) return{
        success: false,
        status: 404,
        message: "Lote não encontrado"
    }

    return {
        success: true,
        status: 200,
        message: "Lote encontrado.",
        data: encontrarLote
    }
}