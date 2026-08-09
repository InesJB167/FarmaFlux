import {listarLotesService} from "../service/listar-lotes.service.js"

export const buscarLotes = async(req, res) =>{
    try {

        const listarLotes = await listarLotesService()
        return res.status(listarLotes.status).json(listarLotes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}