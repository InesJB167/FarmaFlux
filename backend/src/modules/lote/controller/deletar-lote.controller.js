import { validarId } from "../../../utils/validar-id.js"
import {deletarLoteService} from "../service/deletar-lote.service.js"

export const eliminarlote = async (req,res) =>{
    try {
        const id = Number(req.params.id)
        const verificarId = validarId(id)

        if(!verificarId) return res.status(400).json({message: "ID inválido."})

        const eliminandoLote = await deletarLoteService(id)

        if(!eliminandoLote.success) return res.status(eliminandoLote.status).json(eliminandoLote)

        return res.json(eliminandoLote)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}