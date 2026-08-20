import { listarBarcodesService } from "../service/listar-barcodes.service.js"

export const listarBarcodesAtivos = async (req,res) =>{
    try {

        const listarTodosBarcodes = await listarBarcodesService()
        return res.status(listarTodosBarcodes.status).json(listarTodosBarcodes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}
