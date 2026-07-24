import prisma from "../../../../prisma/prisma.js"
import { buscarCategoriaPorIdContagem } from "../repository/buscar-categoria-contagem.js"

export const deletarCategoriaService = async(idCategoria) =>{
    const categoriaExistente = await buscarCategoriaPorIdContagem(idCategoria)

    if(!categoriaExistente) return {
        success: false,
        status: 404,
        message:  "categoria nao encontrada"
    }

    if(categoriaExistente._count.medicamentos > 0){
        
        return {
            success: false,
            status: 409,
            message: "Categoria em uso: existem medicamentos ainda registrados nessa categoria."
        }
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