import prisma from "../../../../../prisma/prisma.js"

export const listarNotasCreditoPorPeriodo = async(dataInicio,dataFim)=>{
    return prisma.notas_credito.findMany({
        where:{
            data_emissao:{
                gte: dataInicio,
                lte: dataFim
            }
        }
    })
}