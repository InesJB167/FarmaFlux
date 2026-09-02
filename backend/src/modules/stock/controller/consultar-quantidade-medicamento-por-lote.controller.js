import { validarId } from "../../../utils/validar-id.js"
import {listarQuantidadeMedicamentoDisponivelPorLote} from "../service/consultar-quantidade-medicamento-por-lote.service.js"

export const listarLotesPorMedicamentosNoStock = async(req,res)=>{
    try {
        const idMedicamento = Number(req.query.idMed)
        console.log(idMedicamento)
        if(!validarId(idMedicamento)) return res.status(400).json({message:"ID inválido."})

        const lista = await listarQuantidadeMedicamentoDisponivelPorLote(idMedicamento)

        return res.status(lista.status).json(lista)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}