import prisma from "../../../../prisma/prisma.js";
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js";

export const listarLocalizacoesService = async (farmaciaId) =>
{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const listarLocalizacoes = await prisma.localizacoes.findMany({
        where: {
            farmacia_id,
            deleted_at: null
        },
        orderBy: [
            { zona: "asc" },
            { estante: "asc" },
            { nivel: "asc" }
        ]
    })

    return {
        success: true,
        message: "Localizações encontradas.",
        data: listarLocalizacoes
    }
}