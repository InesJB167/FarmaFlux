import { validarId } from "../../../utils/validar-id.js"
import {editarFornecedorService} from "../service/atualizar-fornecedor.service.js"

export const editarFornecedor = async(req, res) =>{
    try {
        const id = Number(req.params.id)
        const verificarId = validarId(id)

        if(!verificarId) return res.status(400).json({message: "ID inválido"})

        const nome_empresa = req.body.nome_empresa?.trim()
        const verificarNome = req.body.hasOwnProperty("nome_empresa")
        const nif = req.body.nif?.trim()
        const verificarNif = req.body.hasOwnProperty("nif")
        const contacto = req.body.contacto?.trim()
        const verificarContacto = req.body.hasOwnProperty("contacto")
        const endereco = req.body.endereco?.trim()
        const verificarEndereco = req.body.hasOwnProperty("endereco")

        if(nome_empresa === undefined && nif === undefined && contacto === undefined && endereco === undefined) return res.status(400).json({message: "Nenhum campo foi enviado para atualização."})

        let dadosEditados = {}

        if(verificarNome) dadosEditados.nome_empresa = nome_empresa
        if(verificarNif) dadosEditados.nif = nif
        if(verificarContacto) dadosEditados.contacto = contacto
        if(verificarEndereco) dadosEditados.endereco = endereco

        const editando = await editarFornecedorService(id,dadosEditados)     
        
        if(!editando.success) return res.status(editando.status).json(editando)

        return res.status(editando.status).json(editando)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}
