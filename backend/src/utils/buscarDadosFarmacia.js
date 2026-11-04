import { decodificarToken } from "./decodificandoToken.js"
import jwt from "jsonwebtoken"

export const buscarDadosFarmacia = (req, res) =>
{
    try {
        const authorization = req.headers.authorization
        const tokenLogin = decodificarToken(authorization)

        if (!authorization || !tokenLogin) return res.status(400).json({ message: "Token inválido ou mal formatado." })

        const payload = jwt.verify(tokenLogin, process.env.JWT_SECRET)
        const farmaciaId = parseInt(payload.farmacia_id)

        if (!farmaciaId) return res.status(400).json({ message: "Farmácia id faltando" })

        return farmaciaId
    } catch (error) {
        console.log(error)
        if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) return res.status(401).json({ message: "Token inválido ou expirado." })
    }
}