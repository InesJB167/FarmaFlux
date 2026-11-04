import { listarCategoriaService } from "../services/listar-categoria.service.js"
import jwt from "jsonwebtoken"
import { decodificarToken } from "../../../utils/decodificandoToken.js"

export const listarCategoria = async (req, res) =>
{
    try {
        const authorization = req.headers.authorization
        const token = decodificarToken(authorization)

        if (!authorization || !token) return res.status(400).json({ message: "Token inválido ou mal formatado." })

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const farmaciaId = parseInt(payload.farmacia_id)

        if (!farmaciaId) return res.status(400).json({ message: "Farmácia id faltando" })
        const listar = await listarCategoriaService(farmaciaId)

        if (!listar.success) return res.status(404).json(listar)

        return res.json(listar)

    } catch (error) {
        console.log(error.message)
        if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) return res.status(401).json({message:"Token inválido ou expirado."})
        return res.status(500).json({ error: error.message })
    }
}