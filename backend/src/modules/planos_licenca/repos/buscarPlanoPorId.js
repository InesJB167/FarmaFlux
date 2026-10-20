import prisma from "../../../../prisma/prisma.js"

export const buscarPlanoLicencaPorId = async(idPlano)=>{
    return await prisma.planos_licenca.findUnique({
        where:{
            id: idPlano
        }
    })
}