import prisma from "../../../../prisma/prisma.js";

export const buscarBarcodePorId = async (id)=>{
    return await prisma.barcodes.findFirst({
        where:{
            id,
            deleted_at: null
        },
        select:{
            id: true,
            codigo: true,
            medicamentos:{
                select:{
                    id: true,
                    nome: true
                }
            }
        }
    })
}