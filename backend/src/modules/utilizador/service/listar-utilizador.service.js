import prisma from "../../../../prisma/prisma.js"

export const listarUtilizadorService = async ( idUser) =>{

    const utilizadores = await prisma.utilizadores.findMany({
        select:{
            id: true,
            nome: true,
            username: true,
            role: true,
            status: true,
            approved_at: true
        }
    })

    if(!utilizadores){
        throw new Error("Sem usuários no banco")
    }

    console.log("lista de users",utilizadores)

    return {
        success: true,
        message: "Usuários do sistema:",
        data: utilizadores
    }
}