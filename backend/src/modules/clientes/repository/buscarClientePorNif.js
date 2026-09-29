import prisma from "../../../../prisma/prisma.js"

export const buscarClientePorNif = async (nif)=>{
    return await prisma.clientes.findUnique({
        where:{
            nif
        }
    })
}