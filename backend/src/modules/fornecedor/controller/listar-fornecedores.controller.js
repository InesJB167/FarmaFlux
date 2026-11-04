import { listarFornecedoresService } from "../service/listar-fornecedores.service.js"
import { decodificarToken } from "../../../utils/decodificandoToken.js"
import jwt from "jsonwebtoken"

export const listarFornecedores = async (req, res) =>
{
    try {
        const authorization = req.headers.authorization
        const token = decodificarToken(authorization)

        if (!authorization || !token) return res.status(400).json({ message: "Token inválido ou mal formatado." })

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const farmaciaId = parseInt(payload.farmacia_id)

        if (!farmaciaId) return res.status(400).json({ message: "Farmácia id faltando" })

        const listarTodosFornecedores = await listarFornecedoresService(farmaciaId)
        return res.status(listarTodosFornecedores.status).json(listarTodosFornecedores)
    } catch (error) {
        console.log(error)
        if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) return res.status(401).json({message:"Token inválido ou expirado."})
        return res.status(500).json({ error: error.message })
    }
}