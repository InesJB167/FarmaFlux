import {listarTodosLotes} from "../repository/listarTodosLotes.js"

export const listarLotesService = async ()=>{
    const buscarLotes = await listarTodosLotes()

    if(buscarLotes.length === 0) return{
        success: true,
        status: 200,
        message: "Nenhum lote registrado."
    }

    return {
        success: true,
        status: 200,
        message: "Lotes encontrados.",
        data: buscarLotes
    }
}