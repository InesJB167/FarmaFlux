import prisma from "../../../../prisma/prisma.js";
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js";
import { buscarBarcodePorCodigo } from "../repository/buscarBarcodePorCodigo.js"
import {buscarFarmaciaPorId} from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const registrarBarcodeService = async (farmaciaId,codigo, medicamento_id) => {
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if(!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }
    const farmacia_id = parseInt(farmacia.id)

    const encontrarMedicamento = await buscarMedicamentoPorId(medicamento_id)
    const encontrarBarcode = await buscarBarcodePorCodigo(farmacia_id,codigo)

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
            medicamentos:{
                connect:{
                    id: medicamento_id
                }
            },
            farmacia:{
                connect:{
                    id: farmacia_id
                }
            }
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