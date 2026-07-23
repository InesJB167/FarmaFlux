import { editarCategoriaService } from "../services/editar-categoria.service.js"

export const editarCategoria = async (req, res) =>{
    try {
        const id = Number(req.params.id)
        console.log("id da categoria a ser editada ",id)

        if(Number.isNaN(id)) return res.status(400).json({message:"Id inválido"})
        
        const nome = req.body.nome?.trim()
        const descricao = req.body.descricao?.trim()

        if(!nome && !descricao) return res.status(400).json({message:"Informe o campo que queira editar."})

        let dadosNovos = {
            nome: nome,
            descricao: descricao
        }
        console.log("dados novos: ",dadosNovos)

        const editar = await editarCategoriaService(id, dadosNovos)

        if(!editar.success) return res.status(editar.status).json(editar)
        
        return res.json(editar)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}