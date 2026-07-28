import prisma from "../../../../prisma/prisma.js";

export const buscarLocalizacaoPorId = async (id) => {
    const localizacao = await prisma.localizacoes.findUnique({
        where: {
            id
        }
    })

    if (localizacao.deleted_at !== null) return null

    return localizacao
} 