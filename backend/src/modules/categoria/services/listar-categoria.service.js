import prisma from "../../../../prisma/prisma.js"

export const listarCategoriaService = async ()=>{

    const categorias = await prisma.categorias.findMany({
        where:{
            deleted_at: null
        },
        orderBy:{
            nome: "asc"
        },
        select:{
            id: true,
            nome: true,
            descricao: true,
            created_at: true
        }
    })

    if(categorias.length === 0){
        return {
            success: false,
            message:" Não existem categorias disponiveis."
        }
    }

    return {
        success: true,
        message: "Categorias disponives.",
        data: categorias
    }

}