import prisma from "../../../../prisma/prisma.js"
import { buscarUtilizadorPorId } from "../repositories/user.repository.js"


export const alterarStatusUtilizadorService = async (idUser) => {
    try {
        const user = await buscarUtilizadorPorId(idUser)
        if (!user.success) {
            return user
        }

        let novoStatus
        if (user.data.status === "INATIVO" || user.data.status === "PENDENTE") {
            novoStatus = "ATIVO"
        } else if (user.data.status === "ATIVO") {
            novoStatus = "INATIVO"
        } else {
            return {
                success: false,
                message: "Conta rejeitada não pode ser ativada."
            }
        }

        const alterarStatus = await prisma.utilizadores.update({
            where:{
                id: idUser,
                deleted_at: null
            },
            data:{
                status: novoStatus
            },
            select:{
                id: true,
                username: true,
                status: true
            }
        })

        if(!alterarStatus){
            return {
                success: false,
                message: "erro ao alterar status"
            }
        }

        return {
            success: true,
            message: "status da conta atualizado",
            data: alterarStatus
        }

    } catch (error) {
        throw error
    }
}