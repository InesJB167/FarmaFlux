import { listarMedicamentos } from "../repository/listarMedicamentos.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const listarMedicamentosService = async (farmaciaId) =>
{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const buscarTodosMedicamentos = await listarMedicamentos(farmacia_id)

    if (buscarTodosMedicamentos.length <= 0) return {
        success: false,
        status: 200,
        message: "Sem medicamentos."
    }

    return {
        success: true,
        status: 200,
        message: "Medicamentos registrados.",
        data: buscarTodosMedicamentos
    }
}