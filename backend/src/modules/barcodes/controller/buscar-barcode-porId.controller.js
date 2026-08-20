import { validarId } from "../../../utils/validar-id.js"
import {buscarBarcodePorIdService} from "../service/buscar-barcodes-porId.service.js"

export const encontrarBarcodePorId = async  (req,res) =>{
    try {
        const id = Number(req.params.id)

        const avaliarId = validarId(id)

        if(!avaliarId) return res.status(400).json({
            message: "ID inválido."
        })

        const buscarBarcode = await buscarBarcodePorIdService(id)

        if(!buscarBarcode.success) return res.status(buscarBarcode.status).json(buscarBarcode)

        return res.json(buscarBarcode)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}