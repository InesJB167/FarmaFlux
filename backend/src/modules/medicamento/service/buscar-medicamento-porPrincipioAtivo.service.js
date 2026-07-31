import { bsucarMedicamentosPorPrincipioAtivo } from "../repository/buscarMedicamentoPorPrincipioAtivo.js"

export const bsucarMedicamentosPorPrincipioAtivoService = async (principio_ativo) =>{

    const buscarMedicamento = await bsucarMedicamentosPorPrincipioAtivo(principio_ativo)

    if(buscarMedicamento.length === 0) {
        return {
            success: false,
            status: 404,
            message: "Nenhum medicamento foi registrado com esse principio ativo."
        }
    }

    return {
        success: true,
        status: 200,
        message: "Medicamento encontrado",
        data: buscarMedicamento
    }
}