import prisma from "../../../../prisma/prisma.js"
import { buscarLocalizacaoPorZonaEstanteNivel } from "../repository/buscar-localizacoes-porZona.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const criarLocalizacaoService = async (farmaciaId, zona, estante, nivel, descricao) =>
{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const verficarLocalizacao = await buscarLocalizacaoPorZonaEstanteNivel(farmacia_id,zona, estante, nivel)

    if (verficarLocalizacao) {
        console.log("procurando localizaçao ", verficarLocalizacao)
        return {
            success: false,
            status: 409,
            message: "Essa localização ja foi registrada."
        }
    }

    const criarLocalizacao = await prisma.localizacoes.create({
        data: {
            zona,
            estante,
            nivel,
            descricao,
            farmacia:{
                connect:{
                    id: farmacia_id
                }
            }
        }
    })

    return {
        success: true,
        status: 201,
        message: "Localizção criada.",
        data: criarLocalizacao
    }
}