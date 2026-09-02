import { lotesValidosPorMedicamento } from "../../lote/repository/listarLotesValidos.js"

export const buscarQuantidadeMedicamentoNoStock = async(idMed)=>{
    const lotes = await lotesValidosPorMedicamento(idMed)
    let quantidade = 0
    if(lotes.length > 0){
        
        for(let lote of lotes){
            quantidade += lote.lote.qtd_atual
        }

        return quantidade
    }

    return quantidade
}