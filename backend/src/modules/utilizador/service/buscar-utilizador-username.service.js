import { buscarUserPorUsername } from "../repository/buscarUserPorUsername.js"

export const buscarUtilizadorPorNomeService = async (username)=>{

    try {
        const utilizador = await buscarUserPorUsername(username)

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