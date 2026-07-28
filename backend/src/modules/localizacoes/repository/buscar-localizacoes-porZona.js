import prisma from "../../../../prisma/prisma.js";

export const buscarLocalizacaoPorZonaEstanteNivel = async( zona ,estante ,nivel)=>{
    return await prisma.localizacoes.findFirst({
        where:{
            zona,
            estante,
            nivel,
            deleted_at: null
        }, 
        include:{
            medicamentos: true
        }
    })
}