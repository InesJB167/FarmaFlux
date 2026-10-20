import prisma from "../../../../prisma/prisma.js"

export const buscarCodigoAtivacao = async(codigoAtivacao)=>{
    return await prisma.codigos_ativacao.findUnique({
        where:{
            codigo: codigoAtivacao
        }
    })
}