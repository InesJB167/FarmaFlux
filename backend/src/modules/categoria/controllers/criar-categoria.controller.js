import { criarCategoriaService } from "../services/criar-categoria.service.js"
import { decodificarToken } from "../../../utils/decodificandoToken.js"
import jwt from "jsonwebtoken"

export const criarCategoria = async (req, res)=>{
    try {
        const nomeCategoria = req.body.nomeCategoria?.trim()
        const descricao = req.body.descricao?.trim()
        const authorization = req.headers.authorization
        const token = decodificarToken(authorization)

        if(!authorization || !token) return res.status(400).json({message:"Token inválido ou mal formatado."})

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const farmaciaId = parseInt(payload.farmacia_id)

        if(!farmaciaId) return res.status(400).json({message:"Farmácia id faltando"})

        if(!nomeCategoria || !descricao){
            return res.status(400).json({message:"Preencha todos os campos."})
        }

        //service
        const categoria = await criarCategoriaService(nomeCategoria, descricao,farmaciaId)

        if(!categoria.success) return res.status(409).json(categoria)
        
        return res.status(201).json(categoria)
    } catch (error) {
        console.log(error)
        if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) return res.status(401).json({message:"Token inválido ou expirado."})
        return res.status(500).json({error:error.message})
    }
}