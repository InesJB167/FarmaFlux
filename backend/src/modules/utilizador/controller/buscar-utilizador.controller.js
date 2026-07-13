import { buscarUtilizadorService } from "../service/buscar-utilizador.service.js"

export const buscarUtilizador = async (req, res)=>{

    /**nao esta funcionando ainda 
     * !falta:
     * !validar se for um numero ou nao
     * ?busque uma funçao js que verifica se é um numero ou nao
    */
    const idUser = Number(req.params.id)

    if(Number.isNaN(idUser)){
        return res.status(400).json({message:"Falha ao buscar usuário!"})
    }

    console.log(idUser,"iduser procurado")

    //chamar service
    const utilizador = await buscarUtilizadorService(idUser)

    if(!utilizador.success){
        return res.status(404).json(utilizador.message)
    }

    return res.json(utilizador)
    
}