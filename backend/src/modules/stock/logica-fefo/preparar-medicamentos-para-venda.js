import { lotesValidosPorMedicamento } from "../../lote/repository/listarLotesValidosPorMedicamento.js";
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js";

export const prepararMedicamentosParaVenda = async(itensVenda)=>{
    /**
     * ?esta função vai preparar a retirada dos medicamentos no momento da venda ,vai buscar os lotes que ja estão perto do vencimento(lógica FEFO) e preparar os "possiveis medicamentos" que serão vendidos.
     * *por onde começar??
     * *ela deve ter a noçao dos itens da venda para saber quais medicamentos devem ser procurados 
     * *os itensVenda deve ter [{idVenda:1,idMedicamento:0,quantidade:7},{idVenda:1,idMedicamento:15,quantidade: 15}]
     * *como pegar a quantia pra cada item ??
     * *penso que a deve-se percorrer o array e pra cada item pegar a quantidade requerida a seguir buscar os lotes validos daquele medicamento ,pegue o lote verifique a quantidade se for suficiente adicione a quantia prevista senao passa pra o proximo e a mesma coisa
     * *caso o lote nao forneça a quantia devida ,o que fazer??
     * *pegue do lote a seguir
     * *o que essa funçao vai retornar??
     * *essa função deve retornar pra cada item o/os lote/s que onde cada item vai ser retirado, pode ser algo assim:
     * *[{idVenda:1,
     * *idMedicamento:0,
     * *quantidade:10,
     * *lotes:[{idlote:1,quantia:7},{idlote:2,quantia:3}]}]
     */
   
    const itensParaVenda = []
    
    for(let item of itensVenda){

        const idVenda = item.idVenda
        const idMedicamento = item.idMedicamento
        const encontrarMedicamento = await buscarMedicamentoPorId(idMedicamento)
        const nomeMedicamento = encontrarMedicamento.nome
        const quantidadeRequerida = item.quantidade 

        const lotesParaRetirada = []
        
        let novoItem = {
            idVenda: idVenda,
            idMed: idMedicamento,
            nome: nomeMedicamento,
            quantia: quantidadeRequerida,
        }

        const encontrarLotes = await lotesValidosPorMedicamento(idMedicamento)
        if(encontrarLotes.length > 0){
            let quantidadePrevista
            let quantiaFaltando = 0
            for(let loteValido of encontrarLotes){
                let loteParaRetirada = {}
                const quantiaMedicamentoLote = loteValido.lote.qtd_atual
                const idlote = loteValido.lote.id

                if (quantiaMedicamentoLote < quantidadeRequerida){
                    loteParaRetirada = {
                        id: idlote,
                        quantidade: quantiaMedicamentoLote
                    }
                    quantiaFaltando = quantidadeRequerida - quantiaMedicamentoLote
                    quantidadePrevista = quantiaFaltando
                    lotesParaRetirada.push(loteParaRetirada)
                    novoItem.lotes = lotesParaRetirada

                    continue
                }
                
                if( quantiaMedicamentoLote >= quantidadePrevista && quantiaFaltando !== 0) {
                    console.log("faltou ",quantiaFaltando,"vou apenas adicionar ")
                    loteParaRetirada = {
                        id: idlote,
                        quantidade: quantiaFaltando
                    }

                    lotesParaRetirada.push(loteParaRetirada)
                    novoItem.lotes = lotesParaRetirada
                    break
                }

                loteParaRetirada = {
                        id: idlote,
                        quantidade: quantidadeRequerida
                }

                lotesParaRetirada.push(loteParaRetirada)
                novoItem.lotes = lotesParaRetirada
                break
            }
        }
        
        itensParaVenda.push(novoItem)
    }

    return itensParaVenda
}