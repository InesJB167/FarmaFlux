import { buscarMedicamentoPorNome } from "../repository/buscarMedicamentoPorNome.js"

export const buscarMedicamentoPorNomeService = async (nome) =>{
    const medicamento = await buscarMedicamentoPorNome(nome)

    if(!medicamento) {
        return {
            success: false,
            status: 404,
            message: "Medicamento não encontrado."
        }
    }

    return {
        success: true,
        status: 200,
        message: "Medicamento encontrado.",
        data: medicamento
    }
}