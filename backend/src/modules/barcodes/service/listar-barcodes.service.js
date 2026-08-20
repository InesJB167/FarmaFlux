import {listarTodosBarcodes} from "../repository/buscarTodosBarcodes.js"

export const listarBarcodesService= async() =>{
    const listandoBarcodes = await listarTodosBarcodes()

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