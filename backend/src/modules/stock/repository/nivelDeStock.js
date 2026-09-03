import { listarLotesComClassificacaoValidade } from "../../lote/repository/listarLotesComClassificacaoValidade.js"
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js"

export const nivelDeStockMedicamentos = async()=>{
    /**
     * ?esta funçao vai listar o nivel de stock de cada medicamento
     */
    const listaMedicamentos = await listarLotesComClassificacaoValidade()
    let medicamentosComNivel = []

    for(let lote of listaMedicamentos){
        let medicamentoComNivel = {}
        if(lote.classificacao !== "VENCIDO"){
            
            const quantiaDeMedicamento = lote.lote.qtd_atual
            let numeroDeLotes = 1
            let quantiaMedicamentoFinal 
            let stockMinimo

             const medicamentoExistente = medicamentosComNivel.find(elemento=>
                lote.lote.medicamento.nome === elemento.nome)

            if(medicamentoExistente){
                medicamentoExistente.quantidade += quantiaDeMedicamento
                medicamentoExistente.numeroLotes += numeroDeLotes
                quantiaMedicamentoFinal = medicamentoExistente.quantidade
                stockMinimo = medicamentoExistente.stockMinimo
                
            } else {

                const medicamentoId = lote.lote.medicamento.id
                const encontrarMedicamento = await buscarMedicamentoPorId(medicamentoId)
                stockMinimo = encontrarMedicamento.stock_minimo
                
                medicamentoComNivel = {
                    id: medicamentoId,
                    nome: encontrarMedicamento.nome,
                    stockMinimo,
                    quantidade: quantiaDeMedicamento,
                    numeroLotes: numeroDeLotes,
                    nivel: "NORMAL"
                }
                quantiaMedicamentoFinal = medicamentoComNivel.quantidade

                medicamentosComNivel.push(medicamentoComNivel)
            }

            let estadoDoStock
            console.log("quantia de medicamento ",quantiaMedicamentoFinal)
            if(quantiaMedicamentoFinal < stockMinimo && quantiaMedicamentoFinal !== 0){
                estadoDoStock = "BAIXO"
            } else if(quantiaMedicamentoFinal === 0){
                estadoDoStock = "VAZIO"
            } else if(quantiaMedicamentoFinal >= stockMinimo ){
                estadoDoStock = "NORMAL"
            }

            if(medicamentoExistente){
                medicamentoExistente.nivel = estadoDoStock
            } else {
                medicamentoComNivel.nivel = estadoDoStock
            }

        }

    }

    return medicamentosComNivel
}