import prisma from "../../../../prisma/prisma.js"

export const buscarFarmaciaPeloNif = async(nif)=>{
    return await prisma.farmacia.findUnique({
        where: {
            nif
        }
    })
}