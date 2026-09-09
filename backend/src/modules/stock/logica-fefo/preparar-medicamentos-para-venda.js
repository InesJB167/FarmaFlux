import { lotesValidosPorMedicamento } from "../../lote/repository/listarLotesValidosPorMedicamento.js";
import prisma from "../../../../prisma/prisma.js";

export const prepararMedicamentosParaVenda = async(itensVenda, client = prisma)=>{
    /**
     * ?esta função vai preparar a retirada dos medicamentos no momento da venda ,vai buscar os lotes que ja estão perto do vencimento(lógica FEFO) e preparar os "possiveis medicamentos" que serão vendidos.
     * 
     */
   
    const itensParaVenda = []
    
    for(let item of itensVenda){

        const idItem = item.id
        const idVenda = item.venda_id
        const idMedicamento = item.medicamento.id
        const nomeMedicamento = item.medicamento.nome
        const quantidadeRequerida = item.quantidade 

        const lotesParaRetirada = []
        
        let novoItem = {
            id: idItem,
            idVenda: idVenda,
            idMed: idMedicamento,
            nome: nomeMedicamento,
            quantia: quantidadeRequerida,
        }

        const encontrarLotes = await lotesValidosPorMedicamento(idMedicamento,client)
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
        } else {
            throw new Error(`Nenhum lote de ${nomeMedicamento} foi encontrado.`)
        }
        
        itensParaVenda.push(novoItem)
    }

    return itensParaVenda
}