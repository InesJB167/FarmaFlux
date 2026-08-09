import { validarId } from "../../../utils/validar-id.js"
import { buscarFornecedorPorId } from "../../fornecedor/repository/buscarFornecedorPorId.js"
import {registrarLotesService} from "../service/registrar-lote.service.js"

export const registrarLote = async (req, res) =>{
    try {
        const idMedicamento = Number(req.body.idMedicamento)
        const idFornecedor = Number(req.body.idFornecedor)
        /**
         * so estou fazendo essas verificaçoes todas porque eu quero saber especificamente qual dos ids não é válido ...pra me ajudar a resolver os bugs futuros (de nada futura Eu)
         */
        const validaridFornecedor = validarId(idFornecedor)
        const validarIdMedicamento = validarId(idMedicamento)

        if(!validarIdMedicamento) return res.status(400).json({message:"ID medicamento Inválido."})
        if(!validaridFornecedor) return res.status(400).json({message: "ID fornecedor Inválido."})

        const numeroLote = req.body.numeroLote?.trim()
        const quantidadeInicial = Number(req.body.quantidadeInicial)

        const preco = parseFloat(req.body.preco)

        if(Number.isNaN(preco) || preco <= 0) return res.status(400).json({message: "Preço do lote inválido."})

        if(!req.body.dataValidade ) return res.status(400).json({message:"Data de validade obrigatória."})

        const dataValidade = new Date(req.body.dataValidade)

        if(Number.isNaN(dataValidade.getTime()) || dataValidade <= new Date())return res.status(400).json({message:"Data de validade inválida"})
        
        console.log(numeroLote, dataValidade ,quantidadeInicial)
        if(!numeroLote ) return res.status(400).json({message:"Campo obrigatório."})

        if(Number.isNaN(quantidadeInicial) || quantidadeInicial <= 0) return res.status(400).json({message: "Quantidade inicial inválida."})

        /**
         * ?o NIF do registro do lote não pode ser diferente daquele que esta registrado por isso pra evitar erros ...busca-se o fornecedor e automaticamente o NIF é preenchido.
         * 
         * *mas e se o user quiser registrar o lote de um fornecedor novo que não esta registrado no sistema?? 
         * *creio que isso deve ser visto mais a frente,paciencia jovem ninja kkk ,pois por agora melhor seguir a primeira opçao.
         */
        let nif 
        const encontrarFornecedor = await buscarFornecedorPorId(idFornecedor)
        if(encontrarFornecedor){
            nif = encontrarFornecedor.nif
        } else {
            return res.status(404).json({message:"Fornecedor não encontrado."})
        }

        const dadosDoLote = {
            numero_lote: numeroLote,
            data_validade: dataValidade,
            qtd_inicial: quantidadeInicial,
            preco_custo: preco,
            nif_fornecedor: nif
        }
        console.log("dados do lote ",dadosDoLote)

        const registrarNovoLote = await registrarLotesService(idMedicamento,idFornecedor,dadosDoLote)

        if(!registrarNovoLote.success) return res.status(registrarNovoLote.status).json(registrarNovoLote)

        return res.status(registrarNovoLote.status).json(registrarNovoLote)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}