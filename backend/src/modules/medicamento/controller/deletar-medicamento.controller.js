import { validarId } from "../../../utils/validar-id.js"
import {deletarMedicamentoService} from "../service/deletar-medicamento.service.js"

export const deletarMedicamento = async (req, res) =>{
    try {
        const id = Number(req.params.id)
        const verificarId = validarId(id)
        if(!verificarId) return res.status(400).json({message: "ID inválido."})

        const deletandoMedicamento = await deletarMedicamentoService(id)
        if(!deletandoMedicamento.success) return res.status(deletandoMedicamento.status).json(deletandoMedicamento)

        return res.json(deletandoMedicamento)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}