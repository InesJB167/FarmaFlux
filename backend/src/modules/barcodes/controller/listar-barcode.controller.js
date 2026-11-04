import { listarBarcodesService } from "../service/listar-barcodes.service.js"
import {buscarDadosFarmacia} from "../../../utils/buscarDadosFarmacia.js"

export const listarBarcodesAtivos = async (req,res) =>{
    try {
        const farmaciaId = buscarDadosFarmacia(req,res)
        const listarTodosBarcodes = await listarBarcodesService(farmaciaId)
        return res.status(listarTodosBarcodes.status).json(listarTodosBarcodes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}
