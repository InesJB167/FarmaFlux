import prisma from "../../../../../prisma/prisma.js"

export const listarFaturasAnual = async (anoRequisitado, client = prisma)=>{
    //?essa funçao lista todas as faturas referentes a um ano inteiro.
    return await client.fatura.findMany({
        where:{
            ano: anoRequisitado
        }
    })
}