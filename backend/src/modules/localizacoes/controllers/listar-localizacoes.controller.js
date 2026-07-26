import { listarLocalizacoesService } from "../services/listar-localizacoes.service.js"

export const listarLocalizacoes = async(req, res) =>{
    try {
        const listarLocalizacoes = await listarLocalizacoesService()
        if(listarLocalizacoes.legth === 0 ) return res.status(404).json({message: "Não foram encontradas nenhuma localizacao."})
        
        return res.json(listarLocalizacoes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}