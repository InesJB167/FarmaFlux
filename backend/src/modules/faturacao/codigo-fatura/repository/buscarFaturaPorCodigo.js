import prisma from "../../../../../prisma/prisma.js"

export const buscarFaturaPorCodigo = async (codigoFatura, client = prisma)=>{
    return await client.fatura.findUnique({
        where: {
            codigo_fatura: codigoFatura
        }
    })
}