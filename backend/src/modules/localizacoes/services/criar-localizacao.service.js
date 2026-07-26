import prisma from "../../../../prisma/prisma.js"
import { buscarLocalizacaoPorZonaEstanteNivel } from "../repository/buscar-localizacoes-porZona.js"

export const criarLocalizacaoService = async(zona ,estante ,nivel, descricao) =>{
    const verficarLocalizacao = await buscarLocalizacaoPorZonaEstanteNivel(zona, estante, nivel)

    if(verficarLocalizacao){
        console.log("procurando localizaçao ",verficarLocalizacao)
        return {
        success: false,
        status: 409,
        message: "Essa localização ja foi registrada."
    }
    }

    const criarLocalizacao = await prisma.localizacoes.create({
        data:{
            zona,
            estante,
            nivel,
            descricao
        }
    })

    return {
        success: true,
        message: "Localizção criada.",
        data: criarLocalizacao
    }
}