import { deletarUtilizadorService } from "../service/deletar-utilizador.service.js"

export const deletarUtilizador = async(req, res) =>{
    try {
        const id = Number(req.params.id)

        if(Number.isNaN(id)) return res.status(400).json({message: "ID inválido!"})

        //service
        const deletarUser = await deletarUtilizadorService(id)

        if(!deletarUser.success) return res.status(404).json(deletarUser)
        
        return res.json(deletarUser) 

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error: error.message})
    }
}