import { listarFornecedoresAtivos } from "../repository/listarFornecedoresAtivos.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const listarFornecedoresService = async (farmaciaId) =>
{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const listarFornecedores = await listarFornecedoresAtivos(farmacia_id)
    if (listarFornecedores.length === 0) {
        return {
            success: true,
            status: 200,
            message: "Não existem fornecedores registrados.",
            data: []
        }
    }

    return {
        success: true,
        status: 200,
        message: "Lista de fornecedores obtida com sucesso.",
        data: listarFornecedores
    }
}