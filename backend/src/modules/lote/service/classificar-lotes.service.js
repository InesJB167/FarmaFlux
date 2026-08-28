import { listarLotesComClassificacaoValidade } from "../repository/listarLotesComClassificacaoValidade.js";

export const classificarLotesPelaDataValidade = async () => {
    const classificarLotes = await listarLotesComClassificacaoValidade()

    if(classificarLotes.length <= 0) return{
        success: true,
        status: 200,
        message: "Não existem lotes registrados."
    }

    return {
        success: true,
        status: 200,
        message: "Lotes classificados.",
        data: classificarLotes
    }
}
