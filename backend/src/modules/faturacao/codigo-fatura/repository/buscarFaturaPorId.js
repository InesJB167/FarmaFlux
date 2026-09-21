import prisma from "../../../../../prisma/prisma.js"

export const buscarFaturaPorId = async(faturaId, client = prisma)=>{
    return await client.fatura.findUnique({
        where:{
            id: faturaId
        }
    })
}