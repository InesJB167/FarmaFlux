import prisma from "../../../../prisma/prisma.js";
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js";
import { buscarBarcodePorCodigo } from "../repository/buscarBarcodePorCodigo.js"

export const registrarBarcodeService = async (codigo, medicamento_id) => {
    const encontrarMedicamento = await buscarMedicamentoPorId(medicamento_id)
    const encontrarBarcode = await buscarBarcodePorCodigo(codigo)

    if (!encontrarMedicamento) return {
        success: false,
        status: 404,
        message: "Medicamento não encontrado."
    }

    if (encontrarBarcode) return {
        success: false,
        status: 409,
        message: "Este código pertence a outro medicamento."
    }

    const criarBarcode = await prisma.barcodes.create({
        data: {
            codigo,
            medicamento_id
        },
        select: {
            id: true,
            codigo: true,
            medicamentos: {
                select: {
                    id: true,
                    nome: true
                }
            }
        }
    })

    return {
        success: true,
        status: 201,
        message: "Barcode registrado.",
        data: criarBarcode
    }

}