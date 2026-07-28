import prisma from "../../../../prisma/prisma.js"
import {buscarLocalizacaoPorId} from "../repository/buscar-localizacoesPorId.js"

export const alterarLocalizacaoService = async (id ,zona, estante, nivel, descricao) => {
    const buscarLocalizacao = await buscarLocalizacaoPorId(id)

    if(!buscarLocalizacao) return {
        success: false,
        status: 404,
        message: "Localização não encontrada."
    }

    const atualizarLocalizacao = await prisma.localizacoes.update({
        where:{
            id
        },
        data:{
            zona: zona || buscarLocalizacao.zona,
            estante: estante || buscarLocalizacao.estante,
            nivel: nivel || buscarLocalizacao.nivel,
            descricao: descricao || buscarLocalizacao.descricao
        }
    })

    return {
        success: true,
        status: 200,
        message: "Localização atualizada.",
        data: atualizarLocalizacao
    }
}