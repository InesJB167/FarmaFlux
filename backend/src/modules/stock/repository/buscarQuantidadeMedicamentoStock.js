import { lotesValidosPorMedicamento } from "../../lote/repository/listarLotesValidosPorMedicamento.js"

export const buscarQuantidadeMedicamentoNoStock = async(idMed)=>{
    const lotes = await lotesValidosPorMedicamento(idMed)
    let quantidade = 0
    let resultado = []
    if(lotes.length > 0){
        
        for(let lote of lotes){
            quantidade += lote.lote.qtd_atual
        }

        //?pegar o numero de lotes
        const numeroLotes = lotes.length
        resultado.push(quantidade,numeroLotes)
        return resultado 
    }

    return resultado
}