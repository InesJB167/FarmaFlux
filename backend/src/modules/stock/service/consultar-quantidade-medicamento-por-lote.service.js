import { listarLotesComClassificacaoValidade } from "../../lote/repository/listarLotesComClassificacaoValidade.js"
import { lotesValidosPorMedicamento } from "../../lote/repository/listarLotesValidos.js"
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js"

export const listarQuantidadeMedicamentoDisponivelPorLote = async (idMedicamento)=>{
    const medicamento = await buscarMedicamentoPorId(idMedicamento)
    if(!medicamento) return {
        success: false,
        status: 404,
        message: "Medicamento não encontrado."
    }
    
    const lotes = await lotesValidosPorMedicamento(idMedicamento)

    if(lotes.length <= 0)return {
        success: true,
        status: 200,
        message: `Sem lotes de ${medicamento.nome} disponiveis no stock.`
    }

    let lotesValidos = []
    for(let item of lotes){
        let loteValido = {
            id: item.lote.id,
            codigo: item.lote.numero_lote,
            medicamento: item.lote.medicamento.nome,
            quantidade: item.lote.qtd_atual,
            status: item.classificacao
        }

        lotesValidos.push(loteValido)
    }

    return {
        success: true,
        status: 200,
        message: `Lotes de ${medicamento.nome} no stock.`,
        data: lotesValidos
    }
}