import { buscarCategoriaPorId } from "../repository/buscar-categoria-porId.js"

export const buscarCategoriaPorIdService = async (idCategoria) => {

    const categoriaEncontrada = await buscarCategoriaPorId(idCategoria)

    if (!categoriaEncontrada) return { success: false, message: "categoria não encontrada." }

    return {
        success: true,
        message: "Categoria encontrada.",
        data: categoriaEncontrada
    }
}