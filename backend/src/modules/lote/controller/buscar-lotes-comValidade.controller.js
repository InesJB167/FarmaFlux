import {classificarLotesPelaDataValidade} from "../service/classificar-lotes.service.js"

export const listarLotesProximoVencimento = async (req,res) =>{
    try {
        
        const listarLotes = await classificarLotesPelaDataValidade()
        return res.status(listarLotes.status).json(listarLotes)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}