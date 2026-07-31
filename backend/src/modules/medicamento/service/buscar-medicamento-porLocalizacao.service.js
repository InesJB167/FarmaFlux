import { buscarMedicamentosPorLocalizacao } from "../repository/buscarmedicamentoPorLocalizacao.js"

export const buscarMedicamentosPorLocalizacaoService = async (localizacao_id) =>{
    const buscarMedicamento = await buscarMedicamentosPorLocalizacao(localizacao_id)

    if(buscarMedicamento.length === 0) return{
        success: false,
        status: 404,
        message: "Não há registro de nenhum medicamento nessa localização"
    }

    return {
        success: true,
        status: 200,
        message: "Medicamentos encontrados.",
        data: buscarMedicamento
    }
}