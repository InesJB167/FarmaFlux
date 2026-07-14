import { buscarUtilizadorPorNomeService } from "../service/buscar-utilizador-username.service.js"

export const buscarUtilizadorPorNome = async (req, res)=>{
    try {
        const username = req.body.username

        if(!username.trim()){
            console.log("falta o username a ser procurado")
            return res.status(400).json({message:"Informe o nome do usuário!"})
        }

        //service
        const userEncontrado = await buscarUtilizadorPorNomeService(username)
        if(!userEncontrado.success){
            return res.status(404).json(userEncontrado)
        }

        return userEncontrado
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}