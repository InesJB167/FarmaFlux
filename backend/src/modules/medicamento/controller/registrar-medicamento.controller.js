import { buscarDadosFarmacia } from "../../../utils/buscarDadosFarmacia.js"
import { registrarMedicamentoService } from "../service/regstrar-medicamento.service.js"

export const registrarMedicamento = async (req, res) =>
{ //!DEVO TESTAR ISSO...
    try {
        const nome = req.body.nome?.trim()
        const principio_ativo = req.body.principio_ativo?.trim()
        const preco_venda = parseFloat(req.body.preco_venda)
        const categoria_id = Number(req.body.categoria_id)
        const localizacao_id = Number(req.body.localizacao_id)
        const stock_minimo = Number(req.body.stock_minimo)

        const farmaciaId = buscarDadosFarmacia(req, res)

        if (!nome || !principio_ativo || !preco_venda || !stock_minimo || !categoria_id || !localizacao_id) {
            return res.status(400).json({ message: "Campo obrigatório." })
        }

        if (Number.isNaN(categoria_id) || Number.isNaN(localizacao_id) || Number.isNaN(stock_minimo)) {
            console.log("categoria_id: ", categoria_id, "localizacao_id ", localizacao_id, "stock_minimo", stock_minimo)
            return res.status(400).json({ message: "Dado inválido." })
        }

        if (isNaN(preco_venda)) return res.status(400).json({ message: "Forneça um valor válido." })

        const dadosMedicamentos = {
            nome,
            principio_ativo,
            preco_venda,
            stock_minimo
        }

        if (req.body.hasOwnProperty('dosagem')) {
            const dosagem = req.body.dosagem?.trim()
            dadosMedicamentos.dosagem = dosagem
        }


        const novoMedicamento = await registrarMedicamentoService(farmaciaId,categoria_id,
            localizacao_id, dadosMedicamentos)

        if (!novoMedicamento.success) return res.status(novoMedicamento.status).json(novoMedicamento)

        return res.json(novoMedicamento)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}