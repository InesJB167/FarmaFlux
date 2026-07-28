import { registrarMedicamentoService } from "../service/regstrar-medicamento.service.js"

export const registrarMedicamento = async (req, res) => {
    try {
        const nome = req.body.nome?.trim()
        const principio_ativo = req.body.principio_ativo?.trim()
        const dosagem = req.body.dosagem?.trim()
        const preco_venda = parseFloat(req.body.preco_venda)
        const categoria_id = Number(req.body.categoria_id)
        const localizacao_id = Number(req.body.localizacao_id)
        const stock_minimo = Number(req.body.stock_minimo)

        if(isNaN(preco_venda)) return res.status(400).json({message: "Forneça um valor válido."})
            
        if (Number.isNaN(categoria_id) || Number.isNaN(localizacao_id) || Number.isNaN(stock_minimo)) {
                    console.log("categoria_id: ",categoria_id,"localizacao_id ",localizacao_id, "stock_minimo", stock_minimo)
                    return res.status(400).json({ message: "Dado inválido." })
                }
            
            console.log("categoria_id: ",categoria_id,"localizacao_id ",localizacao_id)
            if (!nome || !principio_ativo || !preco_venda || !stock_minimo || !categoria_id || !localizacao_id) {
                return res.status(400).json({ message: "Campo obrigatório." })
            }
            
            
        /**
         * ! localizacao_id quando vem vazia dá problema ...como resolver??
         * *como garantir que a localizacao_id possa vir vazia sendo que não é obrigatório o seu preenchimento?
         */

        const novoMedicamento = await registrarMedicamentoService(nome, principio_ativo, dosagem, preco_venda, stock_minimo, categoria_id, localizacao_id)

        if (!novoMedicamento.success) return res.status(novoMedicamento.status).json(novoMedicamento)

        return res.json(novoMedicamento)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}