import prisma from "../../../../prisma/prisma.js";
import { buscarMedicamentoPorId } from "../repository/buscarMedicamentoPorId.js";

export const deletarMedicamentoService = async(id)=>{
    const buscarMedicamento = await buscarMedicamentoPorId(id)
    
    if(!buscarMedicamento) return{
        success: false,
        status: 404,
        message: "Medicamento não encontrado."
    }

    const deletarMedicamento = await prisma.medicamentos.update({
        where: {
            id
        },
        data: {
            deleted_at: new Date()
        }
    })

    return {
        success: true,
        status: 200,
        message: "Medicamento deletado."
    }
}