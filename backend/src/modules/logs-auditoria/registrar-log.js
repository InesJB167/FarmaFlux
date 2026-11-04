import prisma from "../../../prisma/prisma.js"

export const registrarLog = async (idFarmacia,dadosLog, client = prisma)=>{
    return await client.logs_auditoria.create({
        data:{
            ...dadosLog,
            farmacia:{
                connect:{
                    id: idFarmacia
                }
            }
        }
    })

}