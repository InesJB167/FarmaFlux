import { criarLocalizacaoService } from "../services/criar-localizacao.service.js"

export const criarLocalizacao = async(req, res)=>{
    try {
        const zona = req.body.zona?.trim()
        const estante  = req.body.estante?.trim()
        const nivel = req.body.nivel?.trim()
        const descricao = req.body.descricao?.trim()

        if(!zona || !estante || !nivel){
            return res.status(400).json({message: "Campos obrigatorios!"})
        }

        const criarNovaLocalizacao = await criarLocalizacaoService(zona, estante,nivel ,descricao)
        if(!criarNovaLocalizacao.success) return res.status(criarNovaLocalizacao.status).json({message:criarNovaLocalizacao.message})

        return res.status(201).json(criarNovaLocalizacao)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}