import { listarCategoriaService } from "../services/listar-categoria.service.js"


export const listarCategoria = async(req, res) =>{
    try {

        const listar = await listarCategoriaService()

        if(!listar) return res.status(404).json(listar)
        
        return res.json(listar)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:error.message})
    }
}