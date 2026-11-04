import prisma from "../../../../prisma/prisma.js"

export const bsucarMedicamentosPorPrincipioAtivo = async (farmaciaId,principio_ativo) =>{
    return await prisma.medicamentos.findMany({
        where:{
            farmacia_id: farmaciaId,
            principio_ativo:{
                contains: principio_ativo
            },
            deleted_at: null
        }
    })
}