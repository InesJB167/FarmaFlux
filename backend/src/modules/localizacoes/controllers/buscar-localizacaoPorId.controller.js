import { buscarLocalizacaoPorIdService } from "../services/buscar-localizacaoPorId.service.js"

export const buscarLocalizacaoPorId = async (req, res)=>{
    try {
        const id = Number(req.params.id)

        if(Number.isNaN(id)) return res.status(400).json({message: "Id inválido."})

        const buscarLocalizacao = await buscarLocalizacaoPorIdService(id)
        
        if(!buscarLocalizacao.success) return res.status(buscarLocalizacao.status).json(buscarLocalizacao)

        return res.json(buscarLocalizacao)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}