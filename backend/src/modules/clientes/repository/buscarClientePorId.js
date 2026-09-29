import prisma from "../../../../prisma/prisma.js"

export const buscarClientePorId = async(idCliente)=>{
    return prisma.clientes.findUnique({
        where:{
            id: idCliente
        }
    })
}