import prisma from "../../../../prisma/prisma.js"

export const buscarUtilizadorPorId = async (idUser)=>{
    return await prisma.utilizadores.findUnique({
        where:{
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