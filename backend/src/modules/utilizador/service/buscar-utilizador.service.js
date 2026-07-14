import prisma from "../../../../prisma/prisma.js"

export const buscarUtilizadorService = async (idUser) =>{

    const buscarUtilizador = await prisma.utilizadores.findUnique({
        where:{
            id: idUser
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

    if(!buscarUtilizador){
        console.log("user nao encontrado")
        return {
            success: false,
            message: "Usuário não encontrado!"
        }
    }

    console.log("user pesquisado: ",buscarUtilizador)

    return {
        success: true,
        message: "usuário encontrado: ",
        data: buscarUtilizador
    }
}