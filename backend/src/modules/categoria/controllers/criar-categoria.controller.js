import { criarCategoriaService } from "../services/criar-categoria.service.js"

export const criarCategoria = async (req, res)=>{
    try {
        const nomeCategoria = req.body.nomeCategoria?.trim()
        const descricao = req.body.descricao?.trim()

        if(!nomeCategoria || !descricao){
            return res.status(400).json({message:"Preencha todos os campos."})
        }

        //service
        const categoria = await criarCategoriaService(nomeCategoria, descricao)

        if(!categoria.success) return res.status(409).json(categoria)
        
        return res.status(201).json(categoria)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:error.message})
    }
}