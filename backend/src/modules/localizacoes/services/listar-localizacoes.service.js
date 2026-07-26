import prisma from "../../../../prisma/prisma.js";

export const listarLocalizacoesService = async () => {
    const listarLocalizacoes = await prisma.localizacoes.findMany({
        where: {
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