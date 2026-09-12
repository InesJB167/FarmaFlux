import prisma from "../../../prisma/prisma.js"

export const registrarLog = async (dadosLog, client = prisma)=>{
    return await client.logs_auditoria.create({
        data:{
            ...dadosLog
        }
    })

}