import { bsucarMedicamentosPorPrincipioAtivo } from "../repository/buscarMedicamentoPorPrincipioAtivo.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const bsucarMedicamentosPorPrincipioAtivoService = async (farmaciaId, principio_ativo) =>
{

    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const buscarMedicamento = await bsucarMedicamentosPorPrincipioAtivo(farmacia_id, principio_ativo)

    if (buscarMedicamento.length === 0) {
        return {
            success: false,
            status: 404,
            message: "Nenhum medicamento foi registrado com esse principio ativo."
        }
    }

    return {
        success: true,
        status: 200,
        message: "Medicamento encontrado",
        data: buscarMedicamento
    }
}