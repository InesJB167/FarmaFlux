import prisma from "../../../../prisma/prisma.js"

export const buscarCategoriaPorNome = async (farmacia_id,nome) => {
    return await prisma.categorias.findUnique({
        where: {
            farmacia_id_nome: {farmacia_id, nome}
        }
    })

}