import { buscarMedicamentoPorId } from "../repository/buscarMedicamentoPorId.js"

export const buscarMedicamentoPorIdService = async (id) =>{
    const buscarMedicamento = await buscarMedicamentoPorId(id)

    if(!buscarMedicamento) return{
        success: false,
        status: 404,
        message: "Medicamento não encontrado.",
        data: buscarMedicamento
    }

    return {
        success: true,
        status: 200,
        message: "Medicamento encontrado.",
        data: buscarMedicamento
    }
}