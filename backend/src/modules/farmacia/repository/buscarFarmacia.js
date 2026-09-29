import prisma from "../../../../prisma/prisma.js"

export const buscarFarmaciaPorId = async (idFarmacia)=>{
    return await prisma.farmacia.findUnique({
        where:{
            id: idFarmacia
        }
    })
}