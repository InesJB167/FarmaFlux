import prisma from "../../../../prisma/prisma.js"
import { buscarCategoriaPorNome } from "../repository/buscar-categoria-porNome.js"

export const criarCategoriaService = async (nomeCategoria, descricao)=>{
    try {

        const categoria = await buscarCategoriaPorNome(nomeCategoria)

        if(categoria && categoria.deleted_at === null) return {success: false, message: "Já existe uma categoria com este nome."}

        const criarCategoria = await prisma.categorias.create({
            data:{
                nome: nomeCategoria,
                descricao: descricao
            }
        })

        return {
            success: true,
            message: "Categoria criada com sucesso!",
            data: criarCategoria
        }
    } catch (error) {
        throw error
    }
}