import prisma from "../../../../../prisma/prisma.js"

export const buscarUltimaFatura = async()=>{
    return await prisma.fatura.findMany({
        orderBy:{
            created_at: "desc"
        },
        take: 1
    })
}