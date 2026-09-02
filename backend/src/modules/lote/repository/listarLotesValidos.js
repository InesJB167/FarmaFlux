import { listarLotesClassificadosPorMedicamento } from "./listarLotesClassificadosPorMedicamento.js"

export const lotesValidosPorMedicamento = async(idMedicamento)=>{
    const lotes = await listarLotesClassificadosPorMedicamento(idMedicamento)
    let lotesValidos = []

    if(lotes.length > 0){
        for(let loteAtual of lotes){
            if(loteAtual.classificacao !== "VENCIDO"){
                    lotesValidos.push(loteAtual)
            }
        }

        return lotesValidos
    }

    return   lotesValidos
}