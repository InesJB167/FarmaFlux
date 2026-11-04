import {listarTodosBarcodes} from "../repository/buscarTodosBarcodes.js"
import {buscarFarmaciaPorId} from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const listarBarcodesService= async(farmaciaId) =>{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if(!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }
    const farmacia_id = parseInt(farmacia.id)
    const listandoBarcodes = await listarTodosBarcodes(farmacia_id)

    if(listandoBarcodes.length === 0 ) return {
        success: true,
        status: 200,
        message: "Nenhum barcode registrado"
    }

    return {
        success: true,
        status: 200,
        message: "barcodeS registradoS",
        data: listandoBarcodes
    }
}