import { buscarMedicamentosPorCategoria } from "../repository/buscarMedicamentoPorCategoria.js"

export const buscarMedicamentosPorCategoriaService = async (categoria_id)=>{
    const buscarMedicamento = await buscarMedicamentosPorCategoria(categoria_id)

    if(buscarMedicamento.length === 0) return{
        success: false,
        status: 404,
        message: "Não há registro de medicamentos nessa categoria"
    }

    return {
        success: true,
        status: 200,
        message: "Medicamentos encontrados.",
        data: buscarMedicamento
    }
}