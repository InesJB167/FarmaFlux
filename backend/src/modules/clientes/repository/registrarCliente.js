import prisma from "../../../../prisma/prisma.js"

export const registrarCliente = async(farmacia_id,dadosCliente)=>{
    return await prisma.clientes.create({
        data:{
            ...dadosCliente,
            farmacia:{
                connect:{
                    id: farmacia_id
                }
            }
        }
    })
}