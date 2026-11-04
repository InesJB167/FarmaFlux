import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"
import { buscarMedicamentosPorLocalizacao } from "../repository/buscarmedicamentoPorLocalizacao.js"

export const buscarMedicamentosPorLocalizacaoService = async (farmaciaId,localizacao_id) =>{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if(!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const buscarMedicamento = await buscarMedicamentosPorLocalizacao(farmacia_id,localizacao_id)

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