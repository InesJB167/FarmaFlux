import prisma from "../../../../prisma/prisma.js"

export const buscarCategoriaPorId = async (idCategoria) =>{
    const categoriaProcurada = await prisma.categorias.findUnique({
        where:{
            id: idCategoria,
        }
    })

    if(!categoriaProcurada || categoriaProcurada.deleted_at !== null) {
         return null
    }

    const categoria ={
        id: categoriaProcurada.id,
        nome: categoriaProcurada.nome,
        descricao: categoriaProcurada.descricao,
        created_at: categoriaProcurada.created_at
    }

    return categoria
}