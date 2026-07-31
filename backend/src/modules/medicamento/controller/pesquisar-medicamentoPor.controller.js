import { buscarMedicamentosPorCategoriaService } from "../service/buscar-medicamento-porCategoria.service.js"
import { buscarMedicamentosPorLocalizacaoService } from "../service/buscar-medicamento-porLocalizacao.service.js"
import { buscarMedicamentosPorNomeService } from "../service/buscar-medicamento-porNome.service.js"
import { bsucarMedicamentosPorPrincipioAtivoService } from "../service/buscar-medicamento-porPrincipioAtivo.service.js"

 /**
     * ?tenho definido as buscas ...agora 
     * *de onde virá a escolha das buscas ??
     * ?o user vai querer pesquisar por nome por exemplo e o parametro vira de la ...agora
     * *como pegar o parametro de la??
     * ?a rota é so uma "/search" o que vem a seguir é a funçao que vai definir que tipo de pesquisa vai se fazer ...se a funcao receber um parametro apenas não vai dar muito certo ...porque sao varias possibilidades ...
     * *mas e se forem varias rotas com "/search" mas com funçoes diferentes no final??
     * ?foi o que aconteceu ..não dá.
     * 
     * !deve se achar uma maneira de se criar uma funcao que: 
     * !1-pegue da url o parametro (imagino um const buscarPor = req.query.buscarPor) e a seguir ela verifica se essa busca esta no role de buscas permitidas (imagino um const buscasPermitidas = []) depois da verificacao ...ela esolhe entre as buscaspermitidas quando encontrar ela executa a mesma e retorna o service dela ...será que é possives??
     *
     */

export const pesquisandoMedicamentos = async (req, res) =>{
    try {
        
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
            const buscarPorNome = await buscarMedicamentosPorNomeService(nome)

            if(!buscarPorNome.success) return res.status(buscarPorNome.status).json(buscarPorNome)
            return res.json(buscarPorNome)

        case "principio_ativo":
            const principio_ativo = req.query.principio_ativo?.trim()
            const buscarPorPrincipioAtivo = await bsucarMedicamentosPorPrincipioAtivoService(principio_ativo)

            if(!buscarPorPrincipioAtivo.success) return res.status(buscarPorPrincipioAtivo.status).json(buscarPorPrincipioAtivo)
            return res.json(buscarPorPrincipioAtivo)

        case "categoria_id":
            const categoria_id = Number(req.query.categoria_id)

            if(Number.isNaN(categoria_id)) {
                return res.status(400).json({message:"ID categoria inválido."})
            }
            
            const buscarPorCategoria = await buscarMedicamentosPorCategoriaService(categoria_id)

            if(!buscarPorCategoria.success) return res.status(buscarPorCategoria.status).json(buscarPorCategoria)

            return res.json(buscarPorCategoria)

        case "localizacao_id":
            const localizacao_id = Number(req.query.localizacao_id)

            if(Number.isNaN(localizacao_id)) {
                return res.status(400).json({message:"ID localizacao inválido."})
            }
            
            const buscarPorLocalizacao = await buscarMedicamentosPorLocalizacaoService(localizacao_id)

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