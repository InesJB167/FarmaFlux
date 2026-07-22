import prisma from "../../../../prisma/prisma.js"

export const buscarCategoriaPorNome = async (nomeCategoria) => {
    return await prisma.categorias.findUnique({
        where: {
            nome: nomeCategoria
        }
    })

}