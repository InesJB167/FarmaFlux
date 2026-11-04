import { buscarMedicamentosPorCategoria } from "../repository/buscarMedicamentoPorCategoria.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const buscarMedicamentosPorCategoriaService = async (farmaciaId, categoria_id) =>
{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const buscarMedicamento = await buscarMedicamentosPorCategoria(farmacia_id, categoria_id)

    if (buscarMedicamento.length === 0) return {
        success: false,
        status: 404,
        message: "Não há registro de medicamentos nessa categoria"
    }

    return {
        success: true,
        status: 200,
        message: "Medicamentos encontrados.",
        data: buscarMedicamento
    }
}