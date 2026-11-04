import { buscarMedicamentosPorCategoriaService } from "../service/buscar-medicamento-porCategoria.service.js"
import { buscarMedicamentosPorLocalizacaoService } from "../service/buscar-medicamento-porLocalizacao.service.js"
import { buscarMedicamentosPorNomeService } from "../service/buscar-medicamento-porNome.service.js"
import { bsucarMedicamentosPorPrincipioAtivoService } from "../service/buscar-medicamento-porPrincipioAtivo.service.js"
import {buscarDadosFarmacia} from "../../../utils/buscarDadosFarmacia.js"

export const pesquisandoMedicamentos = async (req, res) =>{
    try {

    const farmaciaId = buscarDadosFarmacia(req,res)
        
    const objectoDeBusca = req.query
    const buscarPor = Object.keys(objectoDeBusca)[0]
    console.log("propriedade do objecto ",buscarPor ,typeof(buscarPor))

    const buscasPermitidas = ["nome","principio_ativo","categoria_id","localizacao_id"]

    if(!buscasPermitidas.includes(buscarPor)) {
        return res.status(400).json({message:"Selecione o critério de busca."})
    }

    switch(buscarPor){
        case "nome" :
            const nome = req.query.nome?.trim()

            if(!nome) return res.status(400).json({message:"Nome do medicamento não pode estar vazio"})

            const buscarPorNome = await buscarMedicamentosPorNomeService(farmaciaId,nome)

            if(!buscarPorNome.success) return res.status(buscarPorNome.status).json(buscarPorNome)

            return res.json(buscarPorNome)

        case "principio_ativo":
            const principio_ativo = req.query.principio_ativo?.trim()
            if(!principio_ativo) return res.status(400).json({message:"Princípio ativo do medicamento não pode estar vazio"})
                
            const buscarPorPrincipioAtivo = await bsucarMedicamentosPorPrincipioAtivoService(farmaciaId,principio_ativo)

            if(!buscarPorPrincipioAtivo.success) return res.status(buscarPorPrincipioAtivo.status).json(buscarPorPrincipioAtivo)
            return res.json(buscarPorPrincipioAtivo)

        case "categoria_id":
            const categoria_id = Number(req.query.categoria_id)

            if(Number.isNaN(categoria_id)) {
                return res.status(400).json({message:"ID categoria inválido."})
            }
            
            const buscarPorCategoria = await buscarMedicamentosPorCategoriaService(farmaciaId,categoria_id)

            if(!buscarPorCategoria.success) return res.status(buscarPorCategoria.status).json(buscarPorCategoria)

            return res.json(buscarPorCategoria)

        case "localizacao_id":
            const localizacao_id = Number(req.query.localizacao_id)

            if(Number.isNaN(localizacao_id)) {
                return res.status(400).json({message:"ID localizacao inválido."})
            }
            
            const buscarPorLocalizacao = await buscarMedicamentosPorLocalizacaoService(farmaciaId,localizacao_id)

            if(!buscarPorLocalizacao.success) return res.status(buscarPorLocalizacao.status).json(buscarPorLocalizacao)

            return res.json(buscarPorLocalizacao)  

        default:
            return res.status(400).json({message:"Não satifez nenhuma das opçoes."})

    }

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}