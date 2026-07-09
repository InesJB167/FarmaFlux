import prisma from "../../../../prisma/prisma.js"

export const listarUtilizadorService = async ( idUser) =>{
    const utilizador = await prisma.utilizadores.findUnique({
        where:{
            id: idUser
        },
        select:{
            ativo: true
        }
    })

    if (!utilizador.ativo){
        return {
            success: false,
            message: "usuário inativo!"
        }
    }

    console.log("estado de atividade do user. ",utilizador.ativo)

    const utilizadores = await prisma.utilizadores.findMany({
        select:{
            id: true,
            nome: true,
            username: true,
            role: true,
            ativo: true
        }
    })

    console.log("lista de users",utilizadores)

    return {
        success: true,
        message: "Usuários do sistema:",
        data: listar
    }
}