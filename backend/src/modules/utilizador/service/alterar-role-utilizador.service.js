import prisma from "../../../../prisma/prisma.js"
import { buscarUtilizadorPorId } from "../repositories/user.repository.js"

export const alteralRoleUtilizadorService = async (id,idAdmin, novoRole)=>{
    try {
        const userSelecionado = await buscarUtilizadorPorId(id)

        /**
         * para a mundança de role o user deve informar um role novo
         */

        if(!userSelecionado.success) return userSelecionado

        if(userSelecionado.data.status === "PENDENTE") return { success: false , message: "o role desse user não pode ser modificado."}

        if(userSelecionado.data.role === novoRole) return {success: false, message: "O utilizador já possui esse role."}
        
        const mudarRole = await prisma.utilizadores.update({
            where:{
                id: id,
                deleted_at: null
            },
            data:{
                role: novoRole,
                updated_at: new Date(),
            }, 
            select:{
                id: true,
                username: true,
                role: true,
                updated_at: true
            }
        })


        return{
            success: true,
            message: "Role do user alterado",
            data: mudarRole
        }

    } catch (error) {
        throw error
    }
}