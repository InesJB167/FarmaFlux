import prisma from "../../../../prisma/prisma.js"
import { buscarUtilizadorPorId } from "../repositories/user.repository.js"


export const rejeitarUtilizadorService = async (idUser, idAdmin) =>{
    try {
        const user = await buscarUtilizadorPorId(idUser)

        if(!user.success) return user

        if(user.data.status !== "PENDENTE") return {success: false, message: "A conta não pode ser rejeitada."}

        const rejeitando = await prisma.utilizadores.update({
            where:{
                id: idUser
            },
            data:{
                status: "REJEITADO",
                rejected_at: new Date(),
                rejected_by: idAdmin
            },
            select:{
                id: true,
                username: true,
                status: true,
                rejected_at: true,
                rejected_by: true
            }
        })

        return {
            success: true,
            message: " conta rejeitada.",
            data: rejeitando
        }
    } catch (error) {
        throw error
    }
}