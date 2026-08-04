import {registrarFornecedorService} from "../service/registrar-fornecedor.service.js"

export const registrarNovoFornecedor = async (req, res) =>{
    try {
        const nome_empresa = req.body.nome_empresa?.trim()
        const nif = req.body.nif?.trim()
        const contacto = req.body.contacto?.trim()
        const endereco = req.body.endereco?.trim()

        if(nome_empresa === undefined && nif === undefined && contacto === undefined && endereco === undefined) return res.status(400).json({message: "Informe os dados para o registro do fornecedor."})
        
        if(!nome_empresa || !nif || !contacto ) return res.status(400).json({message: "Campo obrigatório."})

        const dadosParaRegistro = {
            nome_empresa,
            nif,
            contacto,
            endereco
        }

        console.log(dadosParaRegistro)

        const registrarFornecedor = await registrarFornecedorService(dadosParaRegistro)

        if(!registrarFornecedor.success) return res.status(registrarFornecedor.status).json(registrarFornecedor)

        return res.status(registrarFornecedor.status).json(registrarFornecedor)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}