import { buscarCategoriaPorIdService } from "../services/buscar-categoria-porId.service.js"

export const buscarCategoriaPorId = async (req, res) =>{
    try {
        const id = parseInt(req.params.id)
        console.log("id categoria: ", id)

        if(isNaN(id)) return res.status(400).json({message:"ID categoria inválido"})
        
        const categoria = await buscarCategoriaPorIdService(id)

        if(!categoria.success) return res.status(404).json(categoria)
        
        return res.json(categoria)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error: error.message})
    }
}