import { buscarBarcodePorCodigo } from "../repository/buscarBarcodePorCodigo.js";

export const encontrarBarcodePeloCodigoService = async (codigo) =>{
    const encontrarBarcode = await buscarBarcodePorCodigo(codigo)

    if(!encontrarBarcode) return {
        success: false,
        status: 404,
        message: "Codigo de barras não encontrado."
    }

    return{
        success: true,
        status: 200,
        message: "Codigo de barras encontrado.",
        data: encontrarBarcode
    }
}