import { listarLotesClassificadosPorMedicamento } from "../../lote/repository/listarLotesClassificadosPorMedicamento.js"
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js"

export const consultarStockDeUmMedicamentoService = async(idMedicamento) =>{
    const encontrarMedicamento = await buscarMedicamentoPorId(idMedicamento)
    if(!encontrarMedicamento) return{
        success: false,
        status: 404,
        message: "Medicamento não encontrado."
    }

    const nomeMedicamento = encontrarMedicamento.nome

    /**
     * ?a ideia dessa consulta é buscar a quantidade total deste medicamento no stock
     * *a consulta deve trazer a conta apenas dos não expirados ou de ambos ??
     * *por agora vamos trazer o que é util ,ou seja, os não expirados
     * ?a ideia é somar o numero deste medicamento dos lotes que ainda não passaram da validade.
     * ?logo primeiro posso buscar os lotes validos
     * ?depois somar a quantidade atual de cada lote
     */

    const listarLoteClassificados = await listarLotesClassificadosPorMedicamento(idMedicamento)
    if(listarLoteClassificados.length <= 0) return{
        success: true,
        status: 200,
        message: "Nenhum lote registrado."
    }

    console.log(`lotes encontrados de ${nomeMedicamento} :`,listarLoteClassificados)
    let lotesValidos = []

    for(let lote of listarLoteClassificados){
        if(lote.classificacao !== "VENCIDO"){
            lotesValidos.push(lote)
        }
    }

    let quantidadeMedicamento = 0

    for(let loteValido of lotesValidos){
        const quantidadeLote = loteValido.lote.qtd_atual
        quantidadeMedicamento += quantidadeLote
    }

    return{
        success: true,
        status: 200,
        message: `Quantidade de ${nomeMedicamento} no stock.`,
        data: quantidadeMedicamento 
    }

}