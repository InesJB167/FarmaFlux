import { listarTodosLotesPorMedicamento } from "../../lote/repository/listarTodosLotesPorMedicamento.js"

export const listarTotalLotesNoStockPorMedicamento = async()=>{
    const listarLotes = await listarTodosLotesPorMedicamento()
        if (listarLotes.length > 0) {
    
            const dataAtual = new Date()
    
            const dataUmaSemanaAdiante = new Date(dataAtual)
            dataUmaSemanaAdiante.setDate(dataAtual.getDate() + 7)
    
            const dataUmMesAdiante = new Date(dataAtual)
            dataUmMesAdiante.setMonth(dataAtual.getMonth() + 1)
    
            let listaDeLotesClassificados = []
    
            for (let lote of listarLotes) {
                const dataValidade = lote.data_validade
    
                let classificacao
    
                if (dataValidade <= dataAtual) {
                    classificacao = "VENCIDO"
                } else if (dataValidade <= dataUmaSemanaAdiante) {
                    classificacao = "URGENTE"
                } else if (dataValidade <= dataUmMesAdiante) {
                    classificacao = "ATENÇÃO"
                } else {
                    classificacao = "NORMAL"
                }
    
                const loteClassificado = {
                    lote: lote,
                    classificacao: classificacao
                }
    
                listaDeLotesClassificados.push(loteClassificado)
            }
    
            return listaDeLotesClassificados
        }
    
        return listarLotes
}