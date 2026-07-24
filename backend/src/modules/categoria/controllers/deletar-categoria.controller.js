import { deletarCategoriaService } from "../services/deletar-categoria.service.js"

export const deletarCategoria = async (req, res)=>{
    try {
        const id = Number(req.params.id)
        
        if(Number.isNaN(id)) return res.status(400).json({message: "Id Invalido"})
        
        const deletarCategoria = await deletarCategoriaService(id)

        if(!deletarCategoria.success) return res.status(deletarCategoria.status).json(deletarCategoria)
        
        return res.json(deletarCategoria)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}