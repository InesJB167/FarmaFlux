import { buscarMedicamentosPorNome } from "../repository/buscarMedicamentoPorNome.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const buscarMedicamentosPorNomeService = async (farmaciaId, nome) =>
{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const medicamento = await buscarMedicamentosPorNome(farmacia_id, nome)

    if (medicamento.length === 0) {
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