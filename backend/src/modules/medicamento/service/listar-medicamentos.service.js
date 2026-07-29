import { listarMedicamentos } from "../repository/listarMedicamentos.js"

export const listarMedicamentosService = async ()=>{
    const buscarTodosMedicamentos = await listarMedicamentos()

    if(buscarTodosMedicamentos.length <= 0) return{
        success: false,
        status: 200,
        message: "Sem medicamentos."
    }

    return {
        success: true ,
        status: 200,
        message: "Medicamentos registrados.",
        data: buscarTodosMedicamentos
    }
}