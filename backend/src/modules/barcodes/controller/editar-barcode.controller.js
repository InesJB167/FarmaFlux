import { validarId } from "../../../utils/validar-id.js"
import { validarBarcode } from "../repository/validarBarcode.js"
import { editarBarcodeService } from "../service/editar-barcode.service.js"

export const editarBarcode = async (req, res) => {
    try {

        const id = Number(req.params.id)
        const validandoId = validarId(id)

        if (!validandoId) return res.status(400).json({ message: "ID barcode inválido." })

        const dadosNovos = {}

        if (Object.keys(req.body).length === 0) return res.status(400).json({ message: "Informe os dados para a atualização." })

        if (req.body.hasOwnProperty("codigo")) {
            const codigo = req.body.codigo?.trim()

            if (!codigo) {
                return res.status(400).json({ message: "Codigo inválido." })
            }

            const validarCodigo = validarBarcode(codigo)
            if (!/^\d+$/.test(codigo) || codigo.length !== 13) {
                return res.status(400).json({
                    message: "O código deve possuir exatamente 13 dígitos."
                })
            }

            if (!validarCodigo) {
                return res.status(400).json({
                    message: "O código de barras informado é inválido. Verifique o dígito verificador."
                })
            }

            dadosNovos.codigo = codigo
        }

        if (req.body.hasOwnProperty("medicamento_id")) {
            const medicamento_id = Number(req.body.medicamento_id)
            const avaliarId = validarId(medicamento_id)

            if (!avaliarId) return res.status(400).json({ message: "ID medicamento inválido." })

            dadosNovos.medicamento_id = medicamento_id
        }

        const editando = await editarBarcodeService(id, dadosNovos)
        if (!editando.success) return res.status(editando.status).json(editando)

        return res.json(editando)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}