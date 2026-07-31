import prisma from "../../../../prisma/prisma.js"

export const bsucarMedicamentosPorPrincipioAtivo = async (principio_ativo) =>{
    return await prisma.medicamentos.findMany({
        where:{
            principio_ativo:{
                contains: principio_ativo
            },
            deleted_at: null
        }
    })
}