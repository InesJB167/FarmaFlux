import { pesquisarLotesService } from "../service/pesquisar-lotes.service.js"

export const pesquisarLotes =  async (req, res) => {
        try {
            const possiveisPesquisas = ["numeroLote", "medicamento", "fornecedor"]
            const pesquisarPor = req.query
            console.log("ver o tipo de pesquisa ",pesquisarPor)
            const tiposDePesquisa = Object.keys(pesquisarPor)
            const tipo = tiposDePesquisa[0]

            if (!possiveisPesquisas.includes(tipo)) return res.status(400).json({ message: "Tipo de pesquisa não encontrado." })

            const procurar = await pesquisarLotesService(pesquisarPor)

            return res.json(procurar)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message })
        }
    
}