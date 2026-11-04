import prisma from "../../../../prisma/prisma.js";

export const buscarLocalizacaoPorZonaEstanteNivel = async( farmacia_id,zona ,estante ,nivel)=>{
    return await prisma.localizacoes.findFirst({
        where:{
            farmacia_id,
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