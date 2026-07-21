import prisma from "../../../../prisma/prisma.js"

export const buscarUtilizadorPorId = async(idUser)=>{
    try {
        /**
         * !trabalhando em uma funçao que verifica se o user existe ou nao para nao ter que repetir essa verificaçao
         */
        console.log("id do user a ser procurado ",idUser)
        const user = await prisma.utilizadores.findUnique({
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
                approved_at: true,
            }
        })

        if(!user){
            return {
                success: false,
                message: "usuário não encontrado!"
            }
        }

        return {
            success: true,
            message: "user encontrado",
            data: user
        }
        
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            error: error.message
        }
    }


}