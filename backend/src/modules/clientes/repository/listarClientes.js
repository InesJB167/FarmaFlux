import prisma from "../../../../prisma/prisma.js"

export const listarClientes = async()=>{
    return prisma.clientes.findMany({
        select:{
            id: true,
            nome: true,
            nif: true,
            endereco: true,
            vendas:{
                select:{
                    id: true,
                    data_hora: true
                }
            }
        }
    })
}