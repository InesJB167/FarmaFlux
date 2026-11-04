import prisma from "../../../../prisma/prisma.js"

export const buscarMedicamentosPorNome = async (farmacia_id,nome) =>{
    return await prisma.medicamentos.findMany({
        where:{
            farmacia_id,
            nome:{
                contains: nome
            },
            deleted_at: null
        },
        orderBy:{
            nome: "asc"
        }
    })
}