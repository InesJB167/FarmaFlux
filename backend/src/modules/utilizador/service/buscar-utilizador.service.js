import { buscarUtilizadorPorId } from "../repository/buscarUserPorId.js"

export const buscarUtilizadorService = async (idUser) =>{

    const buscarUtilizador = await buscarUtilizadorPorId(idUser)

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