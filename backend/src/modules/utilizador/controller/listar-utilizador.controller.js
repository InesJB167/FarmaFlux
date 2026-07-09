import { listarUtilizadorService } from "../service/listar-utilizador.service.js"

export const listarUtilizador = async (req, res)=>{
    try {
        const idUser = req.user.id
        console.log("id user que quer listar ",idUser)

        //chamar a função de listagem de usuários aqui
        const listando = await listarUtilizadorService(idUser)
        
        if(!listando.success){
            return res.status(403).json(listando)
        }

        return res.json(listando)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error.message)
    }
}