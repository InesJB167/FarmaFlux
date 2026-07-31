import prisma from "../../../../prisma/prisma.js"

export const buscarMedicamentosPorCategoria = async(categoria_id) =>{
    return await prisma.medicamentos.findMany({
        where:{
            categoria_id,
            deleted_at: null
        },
        include:{
            categoria:{
                select:{
                    id: true,
                    nome: true
                }
            }
        },
        orderBy:{
            nome: "asc"
        }
    })
}