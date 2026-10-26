import prisma from "../../../../prisma/prisma.js"

export const buscarDispositivoPorId = async (idDispositivo)=>{
    return await prisma.dispositivos.findUnique({
        where:{
            id: idDispositivo
        }
    })
}