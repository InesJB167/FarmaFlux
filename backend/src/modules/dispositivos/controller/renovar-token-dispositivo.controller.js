import { renovarTokenDipositivoService } from "../service/renovar-token-dispositivo.service.js"
import jwt from "jsonwebtoken"

export const renovarTokenDipositivo = async (req, res) =>
{
    try {
        /**
         * ?esta função vai permitir a renovaçao do token de um dispositivo desde que o mesmo esteja ativo no sistema e a licença estiver ativa tbm.
         * 
         */

        const tokenAutorizacao = req.headers["x-device-token"]?.split(" ")
        if (!tokenAutorizacao || tokenAutorizacao.length !== 2) return res.status(400).json({ message: "Token faltando ou num formato inválido." })

        const token = tokenAutorizacao[1]

        const renovarToken = await renovarTokenDipositivoService(token)
        return res.status(renovarToken.status).json(renovarToken)

    } catch (error) {
        if( error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError){
            return res.status(401).json({message: "Token inválido"})
        }
        console.log(error)
        return res.status(500).json({ error: error.message})
    }
}