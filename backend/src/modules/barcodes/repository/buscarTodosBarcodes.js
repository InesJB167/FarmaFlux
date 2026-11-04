import prisma from "../../../../prisma/prisma.js";

export const listarTodosBarcodes = async (farmacia_id)=>{
    return await prisma.barcodes.findMany({
        where:{
            farmacia_id,
            deleted_at:null
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