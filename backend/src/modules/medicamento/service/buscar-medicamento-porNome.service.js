import { buscarMedicamentosPorNome } from "../repository/buscarMedicamentoPorNome.js"

export const buscarMedicamentosPorNomeService = async (nome) =>{
    const medicamento = await buscarMedicamentosPorNome(nome)

    if(medicamento.length === 0) {
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