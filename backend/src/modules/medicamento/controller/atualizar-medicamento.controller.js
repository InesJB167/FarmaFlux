import { validarId } from "../../../utils/validar-id.js"
import { atualizarMedicamentoService } from "../service/atualizar-medicamento.service.js"

export const atualizarMedicamento = async (req, res) => {
    try {
        const id = Number(req.params.id) 
        const nome = req.body.nome?.trim()
        const principio_ativo = req.body.principio_ativo?.trim()
        const dosagem = req.body.dosagem?.trim()

        let preco_venda 
        const verificarPreco = req.body.hasOwnProperty("preco_venda")

        verificarPreco? preco_venda = parseFloat(req.body.preco_venda) : undefined

        const verificarCategoria = req.body.hasOwnProperty("categoria_id")
        const verificarLocalizacao = req.body.hasOwnProperty("localizacao_id")
        const verificarStock = req.body.hasOwnProperty("stock_minimo")

        let categoria_id
        let localizacao_id
        let stock_minimo

        verificarCategoria? categoria_id = Number(req.body.categoria_id) : undefined
        verificarLocalizacao? localizacao_id = Number(req.body.localizacao_id) : undefined
        verificarStock? stock_minimo = Number(req.body.stock_minimo) : undefined

        const validarIdMedicamento = validarId(id)
        
        if(!validarIdMedicamento) return res.status(400).json({ message: "Id medicamento inválido." })

        const validarIdCategoria = validarId(categoria_id)
        const validarIdLocalizacao = validarId(localizacao_id)

        console.log(validarIdCategoria, validarIdLocalizacao)
        if(!validarIdCategoria || !validarIdLocalizacao) return res.status(400).json({ message: "Id inválido." })

        if (Number.isNaN(stock_minimo) || Number.isNaN(preco_venda)) return res.status(400).json({ message: "Dado inválido." })
        /**
         * i can code anymore ...dont bother me just so u know my head hurts
         * u were building an object that receives all the new data to be updated
         */
        const dadosNovos = {
            nome,
            principio_ativo,
            dosagem,
            preco_venda,
            stock_minimo,
            categoria_id,
            localizacao_id
        }
        

        const atualizar = await atualizarMedicamentoService(id,dadosNovos)
        if(!atualizar.success) return res.status(atualizar.status).json(atualizar)

        return res.json(atualizar)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}