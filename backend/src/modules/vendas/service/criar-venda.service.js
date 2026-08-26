import prisma from "../../../../prisma/prisma.js"
import {buscarUtilizadorPorId} from "../../utilizador/repository/buscarUserPorId.js"

export const criarVendaService = async (idUser) =>{
    const encontrarUser = await buscarUtilizadorPorId(idUser)
    if(!encontrarUser) return{
        success: false,
        status: 404,
        message: "Usuário não encontrado."
    }

    const iniciarVenda = await prisma.vendas.create({
        data:{
            utilizador_id: idUser
        }
    })

    return {
        success: true,
        status: 201,
        message: "Venda inicializada.",
        data: iniciarVenda
    }
}