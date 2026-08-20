import prisma from "../../../../prisma/prisma.js";

export const listarTodosBarcodes = async ()=>{
    return await prisma.barcodes.findMany({
        where:{
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