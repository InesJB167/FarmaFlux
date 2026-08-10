import { validarId } from "../../../utils/validar-id.js"
import { editarLoteService } from "../service/editar-lote.service.js"

export const editarLote = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const verificarIdLote = validarId(id)

        if(!verificarIdLote) return res.status(400).json({ message: "Id inválido." })

        let dadosEditados = {}

        if (req.body.hasOwnProperty("idMedicamento")) {
            const idMedicamento = Number(req.body.idMedicamento)
            const verificarIdMedicamento = validarId(idMedicamento)

            if ( !verificarIdMedicamento ) {
                return res.status(400).json({ message: "Id inválido." })
            } else{
                dadosEditados.medicamento_id = idMedicamento
            }
        }

        if (req.body.hasOwnProperty("idFornecedor")) {
            const idFornecedor = Number(req.body.idFornecedor)
            const verificarIdFornecedor = validarId(idFornecedor)
             if ( !verificarIdFornecedor ) {
                return res.status(400).json({ message: "Id inválido." })
            } else{
                dadosEditados.fornecedor_id = idFornecedor
            }
        }

        if (req.body.hasOwnProperty("numeroLote")) {
            if (!req.body.numeroLote || !req.body.numeroLote.trim()) {
                return res.status(400).json({ message: "Número de lote não pode estar vazio." })
            } else {
                const numeroLote = req.body.numeroLote.trim()
                dadosEditados.numero_lote = numeroLote
            }
        }

        if (req.body.hasOwnProperty("dataValidade")) {
            const dataValidade = new Date(req.body.dataValidade)
            if (Number.isNaN(dataValidade.getTime()) || dataValidade <= new Date()) {
                return res.status(400).json({ message: "Data de validade inválida." })
            } else {
                dadosEditados.data_validade = dataValidade
            }
        }

        if (req.body.hasOwnProperty("preco")) {
            const preco = parseFloat(req.body.preco)
            if (Number.isNaN(preco) || preco <= 0) {
                return res.status(400).json({ message: "Preço custo inválido." })
            } else {
                dadosEditados.preco_custo = preco
            }
        }

        if (req.body.hasOwnProperty("quantidadeAtual")) {
            const quantidadeAtual = Number(req.body.quantidadeAtual)
            if (Number.isNaN(quantidadeAtual) || quantidadeAtual < 0) {
                return res.status(400).json({ message: "Quantidade atual inválida." })
            } else {
                dadosEditados.qtd_atual = quantidadeAtual
            }
        }

        const editandoLote = await editarLoteService(id,dadosEditados)

        if(!editandoLote.success) return res.status(editandoLote.status).json(editandoLote)

        return res.json(editandoLote)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}