import { alterarStatusUtilizadorService } from "../service/alterar-status-utilizador.service.js"

export const alterarStatusUtilizador = async (req, res) => {
    try {
        /**
         * ?TAREFA: ativar e desativar o status da conta  
         * *primeiro : selecionar o user pelo id
         * *segundo: verificar o status
         * *terceiro: mudar o status
         */

        const id = Number(req.params.id)

        console.log(req.params);
        console.log(req.params.id)

        if (!id) {
            return res.status(400).json({ message: "nenhum user selecionado" })
        }

        //service
        const atualizarStatus = await alterarStatusUtilizadorService(id )

        if (!atualizarStatus.success) {
            return res.status(400).json(atualizarStatus)
        }

        return res.json(atualizarStatus)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}