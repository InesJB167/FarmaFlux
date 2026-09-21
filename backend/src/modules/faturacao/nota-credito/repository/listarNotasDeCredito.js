import prisma from "../../../../../prisma/prisma.js"

export const listarNotasDeCredito = async()=>{
    return await prisma.notas_credito.findMany()
}