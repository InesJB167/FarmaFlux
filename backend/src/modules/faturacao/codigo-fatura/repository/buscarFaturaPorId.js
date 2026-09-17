import prisma from "../../../../../prisma/prisma.js"

export const buscarFaturaPorId = async(faturaId)=>{
    return await prisma.fatura.findUnique({
        where:{
            id: faturaId
        }
    })
}