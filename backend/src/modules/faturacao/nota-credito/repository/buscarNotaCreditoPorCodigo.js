import prisma from "../../../../../prisma/prisma.js"

export const buscarNotaCreditoPorCodigo= async(codigoNota)=>{
    return await prisma.notas_credito.findUnique({
        where:{
            codigo_nota: codigoNota
        }
    })
}