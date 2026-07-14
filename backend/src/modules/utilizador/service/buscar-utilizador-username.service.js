import prisma from "../../../../prisma/prisma.js"

export const buscarUtilizadorPorNomeService = async (username)=>{

    const utilizador = await prisma.utilizadores.findUnique({
        where:{
            username: username
        }
    })

    if(!utilizador){
        return {
            success: false,
            message: "Usuário não encontrado"
        }
    }

    return {
        success: true,
        message: "usuário encontrado:",
        data: utilizador
    }
}