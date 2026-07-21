import prisma from "../../../../prisma/prisma.js"

export const buscarUtilizadorPorNomeService = async (username)=>{

    try {
        const utilizador = await prisma.utilizadores.findMany({
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

    if(!utilizador){
        return {
            success: false,
            message: "Usuário não encontrado"
        }
    }

    return {
        success: true,
        message: "usuário encontrado.",
        data: utilizador
    }

    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}