import prisma from "../../../../prisma/prisma.js"

export const listarClientesPorPeriodo = async(dataInicio,dataFim)=>{
    return prisma.clientes.findMany({
        where:{
            vendas:{
                some:{
                    data_hora:{
                        gte: dataInicio,
                        lte: dataFim
                    }
                }
            }
        }
    })  
}