import { nivelDeStockMedicamentos } from "../repository/nivelDeStock.js"

export const consultarNivelDeStockService = async()=>{
    const medicamentosComNivel = await nivelDeStockMedicamentos()

    if(medicamentosComNivel.length <= 0) return{
        success: false,
        status: 404,
        message: "Nenhum medicamento apresentando o seu nivel no stock."
    }

    return{
        success: true,
        status: 200,
        message: "Nível de medicamentos no stock.",
        data: medicamentosComNivel
    }
}