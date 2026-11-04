import prisma from "../../../../prisma/prisma.js"

export const buscarMedicamentosPorCategoria = async(farmaciaId,categoria_id) =>{
    return await prisma.medicamentos.findMany({
        where:{
            farmacia_id: farmaciaId,
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