import {buscarBarcodePorId} from "../repository/buscarBarcodePorId.js"

export const buscarBarcodePorIdService= async (id)=>{
    const encontrarBarcode = await buscarBarcodePorId(id)

    if(!encontrarBarcode) return{
        success:false,
        status: 404,
        message: "Barcode não encontrado"
    }

    return {
        success: true,
        status: 200,
        message: "Barcode encontrado",
        data: encontrarBarcode
    }
}