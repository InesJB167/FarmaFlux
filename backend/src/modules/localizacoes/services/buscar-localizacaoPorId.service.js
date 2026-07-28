import { buscarLocalizacaoPorId } from "../repository/buscar-localizacoesPorId.js"

export const buscarLocalizacaoPorIdService = async (id) =>{

    const localizacaoProcurada = await buscarLocalizacaoPorId(id)
    if(!localizacaoProcurada) return {
        success: false,
        status: 404,
        message: "Localização não encontrada."
    }

    return {
        success: true,
        status: 200,
        message: "Localização encontrada",
        data: localizacaoProcurada
    }
}