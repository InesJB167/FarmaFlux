import { buscarQuantidadeMedicamentoNoStock } from "./buscarQuantidadeMedicamentoStock.js"
import { verificarDisponibilidadeMedicamento } from "./verificarDisponibilidadeDoMedicamentoStock.js"

export const verificarQuantidadeSuficiente = async(idMed,quantiaRequerida)=>{
    /**
     * ?essa funçao verifica se ha uma quantidade de medicamento suficiente para a quantidade desejada.
     */
    const diponivel = await verificarDisponibilidadeMedicamento(idMed)
    let quantidadeSuficiente = false

    if(diponivel){
        const quantidadeDisponivel = await buscarQuantidadeMedicamentoNoStock(idMed)
        if(quantidadeDisponivel >= quantiaRequerida ){
            quantidadeSuficiente = true
            return quantidadeSuficiente
        } 
    }

    return quantidadeSuficiente
}