import { rejeitarUtilizadorService } from "../service/rejeitar-utilizador.service.js"


export const rejeitarUtilizador = async (req, res) => {
    try {
        //o admin que fez a alteração
        const idAdmin = req.user.id

        const id = Number(req.params.id)
        console.log(id, "id da conta pra ser rejeitada")

        if (Number.isNaN(id)) return res.status(400).json({ message: "ID inválido" })

        const rejeitarConta = await rejeitarUtilizadorService(id, idAdmin)

        if (!rejeitarConta.success) return res.status(404).json(rejeitarConta)

        return res.json(rejeitarConta)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}