import prisma from "../../../../prisma/prisma.js"

export const buscarUtilizadorPorId = async (farmacia_id,idUser)=>{
    return await prisma.utilizadores.findUnique({
        where:{
            farmacia_id,
            id: idUser,
            deleted_at: null
        },
        select:{
            id: true,
            nome: true,
            username: true,
            role: true,
            status: true,
            approved_at: true
        }
    })
}