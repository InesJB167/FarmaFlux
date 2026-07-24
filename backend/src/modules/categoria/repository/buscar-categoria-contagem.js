import prisma from "../../../../prisma/prisma.js"

export const buscarCategoriaPorIdContagem = async(idCategoria)=>{
    const categoria = await prisma.categorias.findUnique({
        where:{
            id: idCategoria
        }, 
        include:{
            _count:{
                select:{
                    medicamentos: true
                }
            }
        }
    })

    if(!categoria || categoria.deleted_at !== null) return null

    return categoria
}