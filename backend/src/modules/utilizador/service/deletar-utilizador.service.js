import prisma from "../../../../prisma/prisma.js"
import { buscarUtilizadorPorId } from "../repositories/user.repository.js"

export const deletarUtilizadorService = async (id)=>{
    try {
        const usuario = await buscarUtilizadorPorId(id)

        if(!usuario.success) return usuario

        //soft delete
        const userDeletado = await prisma.utilizadores.update({
            where:{
                id: id,
            },

            data:{
                deleted_at: new Date()
            },
            select:{
                id: true,
                username: true,
                deleted_at: true
            }
        })

        return {
            success: true,
            message: "usuário deletado!",
            data: userDeletado
        }
    } catch (error) {
        throw error
    }
}