import { listarTotalLotesNoStockPorMedicamento } from "../repository/listarTotalLotesNoStockPorMedicamento.js"

export const consultarStockTotalService = async()=>{
    
    const listarLotes = await listarTotalLotesNoStockPorMedicamento()

    if(listarLotes.length <= 0) return{
        success: true,
        status: 200,
        message: "Não existem lotes registrados no stock."
    }

    return{
        success: true,
        status: 200,
        message: "Lotes no stock.",
        data: listarLotes
    }
}