import {buscarMedicamentoPorIdService} from "../service/buscar-medicamento-porId.service.js"

export const buscarMedicamentoPorId = async (req, res)=>{
    try {
        const id = Number(req.params.id)
        if(Number.isNaN(id)){ 
            return res.status(400).json({message: "ID inválido"})
        }
        
        const medicamentoProcurado = await buscarMedicamentoPorIdService(id)
        if(!medicamentoProcurado.success) return res.status(medicamentoProcurado.status).json(medicamentoProcurado)

        return res.json(medicamentoProcurado)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}