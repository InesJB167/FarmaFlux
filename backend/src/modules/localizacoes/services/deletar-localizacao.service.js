import prisma from "../../../../prisma/prisma.js"
import { buscarLocalizacaoPorZonaEstanteNivel } from "../repository/buscar-localizacoes-porZona.js"
import { buscarLocalizacaoPorId } from "../repository/buscar-localizacoesPorId.js"

export const deletarLocalizacaoService = async(id) =>{
    const localizacaoProcurada = await buscarLocalizacaoPorId(id)

    if(!localizacaoProcurada) return {
        success: false,
        status: 404,
        message: "Localização não encontrada."
    }

    if(localizacaoProcurada._count.medicamentos > 0) return {
        success: false,
        status: 409,
        message: "Esta localização não pode ser apagada: medicamentos armazenados."
    }

    const deletarLocalizacao = await prisma.localizacoes.update({
        where:{
            id
        },
        data:{
            deleted_at: new Date()
        }
    })

    return {
        success: true,
        status: 200,
        message: "Localização deletada.",
        data: deletarLocalizacao
    }

}