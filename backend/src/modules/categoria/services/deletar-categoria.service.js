import prisma from "../../../../prisma/prisma.js"
import { buscarCategoriaPorId } from "../repository/buscar-categoria-porId.js"

export const deletarCategoriaService = async(idCategoria) =>{
    const categoriaExistente = await buscarCategoriaPorId(idCategoria)

    if(!categoriaExistente) return {
        success: false,
        status: 404,
        message:  "categoria nao encontrada"
    }

    const deletar = await prisma.categorias.update({
        where:{
            id: idCategoria
        },
        data:{
            deleted_at: new Date()
        },
        select:{
            id: true,
            nome: true,
            deleted_at: true
        }
    })

    return {
        success: true,
        message: "categoria deletada!",
        data: deletar
    }
    
}