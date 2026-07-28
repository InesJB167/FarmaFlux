import { alterarLocalizacaoService } from "../services/alterar-localizacao.service.js"

export const alterarLocalizacao = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" })

        const zona = req.body.zona?.trim()
        const estante = req.body.estante?.trim()
        const nivel = req.body.nivel?.trim()
        const descricao = req.body.descricao?.trim()

        if (!zona && !estante && !nivel && !descricao) return res.status(400).json({ message: "Envie dados pra serem atualizados." })

        const atualizarLocalizacao = await alterarLocalizacaoService(id, zona, estante, nivel, descricao)

        if(!alterarLocalizacao.success) return res.status(atualizarLocalizacao.status).json(atualizarLocalizacao)
        
        return res.json(atualizarLocalizacao)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}