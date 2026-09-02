import { lotesValidosPorMedicamento } from "../../lote/repository/listarLotesValidos.js"

export const verificarDisponibilidadeMedicamento = async(idMed)=>{
    /**
     * ?esta funçao vai verificar se um medicamento possui algum lote valido para a venda 
     */
    
    const lotesEncontrados = await lotesValidosPorMedicamento(idMed)
    let medicamentoDisponivel = true

    if(lotesEncontrados.length === 0) {
        medicamentoDisponivel = false
        return medicamentoDisponivel
    }

    return medicamentoDisponivel
}