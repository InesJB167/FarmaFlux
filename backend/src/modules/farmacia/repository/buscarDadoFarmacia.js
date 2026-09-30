import prisma from "../../../../prisma/prisma.js"

export const buscarDadosDaFarmacia = async()=>{
    return prisma.farmacia.findFirst()
}