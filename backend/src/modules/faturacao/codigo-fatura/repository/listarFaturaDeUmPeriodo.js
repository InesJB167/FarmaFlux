import prisma from "../../../../../prisma/prisma.js"

export const listarFaturasDeUmPeriodo = async(dataInicio,dataFim)=>{
    return prisma.fatura.findMany({
        where:{
            created_at:{
                gte: dataInicio,
                lte: dataFim
            }
        }
    })
}