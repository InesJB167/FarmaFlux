import prisma from "../../../../prisma/prisma.js"

export const listarCategoriaService = async ()=>{

    const categorias = await prisma.categorias.findMany({
        where:{
            deleted_at: null
        }
    })

    return {
        success: true,
        message: "Categorias disponives.",
        data: categorias
    }

}