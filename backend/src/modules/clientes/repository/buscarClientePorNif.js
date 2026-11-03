import prisma from "../../../../prisma/prisma.js"

export const buscarClientePorNif = async (nif, client = prisma)=>{
    return await client.clientes.findUnique({
        where:{
            nif
        }
    })
}