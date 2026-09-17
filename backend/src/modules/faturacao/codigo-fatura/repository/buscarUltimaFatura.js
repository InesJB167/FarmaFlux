import prisma from "../../../../../prisma/prisma.js"

export const bucarUltimaFatura = async()=>{
    return await prisma.fatura.findMany({
        orderBy:{
            created_at: "desc"
        },
        take: 1
    })
}