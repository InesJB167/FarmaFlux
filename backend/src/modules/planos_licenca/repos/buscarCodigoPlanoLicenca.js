import prisma from "../../../../prisma/prisma.js"

export const buscarCodigoPlanoLicenca = async(codigoPlano)=>{
    return await prisma.planos_licenca.findUnique({
        where:{
            codigo: codigoPlano
        }
    })
}