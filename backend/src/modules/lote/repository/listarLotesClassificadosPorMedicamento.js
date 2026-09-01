import { listarLotesComClassificacaoValidade } from "./listarLotesComClassificacaoValidade.js";

export const listarLotesClassificadosPorMedicamento = async(idMedicamento) =>{
    const lotesClassificados = await listarLotesComClassificacaoValidade()
    const lotesDoMedicamento = []

    for(let loteListado of lotesClassificados){
        const idMedicamentoLote = loteListado.lote.medicamento.id
        console.log(idMedicamentoLote)

        if(idMedicamentoLote === idMedicamento){
            lotesDoMedicamento.push(loteListado)
        }
    }

    return lotesDoMedicamento
}