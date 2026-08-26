import prisma from "../../../../prisma/prisma.js";

export const buscarUserPorUsername = async(username)=>{
    return await prisma.utilizadores.findMany({
        where:{
            username:{
                //encontra todos os registros semelhantes
                contains: username
            },
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