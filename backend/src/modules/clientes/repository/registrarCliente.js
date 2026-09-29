import prisma from "../../../../prisma/prisma.js"

export const registrarCliente = async(dadosCliente)=>{
    return await prisma.clientes.create({
        data:{
            ...dadosCliente
        }
    })
}