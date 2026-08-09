import { validarId } from "../../../utils/validar-id.js"
import {buscarLotePorIdService} from "../service/buscar-lote-porId.service.js"

export const buscarLotePorId = async (req, res) =>{
    try {
        const id = Number(req.params.id)

        const verificarId = validarId(id)

        if(!verificarId) return res.status(400).json({message:"Id lote inválido."})

        const loteEncontrado = await buscarLotePorIdService(id)

        if(!loteEncontrado.success) return res.status(loteEncontrado.status).json(loteEncontrado)

        return res.json(loteEncontrado)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}