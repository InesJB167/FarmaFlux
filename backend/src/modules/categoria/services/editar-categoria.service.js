import prisma from "../../../../prisma/prisma.js"
import { buscarCategoriaPorId } from "../repository/buscar-categoria-porId.js"
import { buscarCategoriaPorNome } from "../repository/buscar-categoria-porNome.js"

export const editarCategoriaService = async (idCategoria, dadosNovos) =>{
    const categoria = await buscarCategoriaPorId(idCategoria)

    if(!categoria) return{ 
        success: false,
        status: 404, 
        message: "categoria não encontrada"}

    /**
     * ?TAREFA: editar a categoria com os dados vindos do body
     * *mas e se nao vier nenhum dado novo de um dos atributos??
     * *deve se permitir que o dado que ja estava la permaneça
     * *como fazer isso ??
     */

    console.log("dados novos no service", dadosNovos)

    if(!dadosNovos.nome) dadosNovos.nome = categoria.nome
    if(!dadosNovos.descricao) dadosNovos.descricao = categoria.descricao

    console.log("dados novos no service se algum capo estiver vazio: ",dadosNovos)

    if(dadosNovos.nome === categoria.nome && dadosNovos.descricao === categoria.descricao){
        return {
            success: false,
            status: 400,
            message: "Nenhum dado foi alterado!"
        }
    }

    const categoriaExistente = await buscarCategoriaPorNome(dadosNovos.nome)

    if(categoriaExistente && categoriaExistente.id !== idCategoria) return {
        success: false, 
        status: 409,
        message: "Ja existe uma categoria com este nome."}

    const editarDados = await prisma.categorias.update({
        where:{
            id: idCategoria
        },
        data: dadosNovos
    })

    return {
        success: true,
        message: "categoria editada",
        data: editarDados
    }
}