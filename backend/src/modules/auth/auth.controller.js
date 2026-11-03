import { entrar } from "./auth.service.js"
import jwt from "jsonwebtoken"

export const login = async (req, res) =>
{
    const username = req.body.username
    const senha = req.body.senha
    const tokenDispositivo = req.headers['x-device-token']
    const tokenFormatado = tokenDispositivo.split(" ")

    if(!tokenDispositivo || tokenFormatado.length !== 2) return res.status(400).json({ message: "Token do dispositivo inválido ou mal formatado." })

    const token = tokenFormatado[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const dispositivo = parseInt(payload.id)

    if (username === undefined && senha === undefined) return res.status(400).json({ message: "Informe os dados para a autenticação." })

    if (!username || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos!" })
    }

    if(!dispositivo) return res.status(400).json({ message: "Id do dispositivo não encontrado." })

    try {
        //aqui vai a funçao do service
        const logar_sistema = await entrar(dispositivo,username, senha)
        if (!logar_sistema.success) {
            return res.status(400).json(logar_sistema)
        }

        console.log("Login efetuado com sucesso!")
        return res.json(logar_sistema)

    } catch (error) {
        console.log(error)
        if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError){
            return res.status(401).json({message: "Token do dispositivo inválido ou expirado"})
        }
        return res.status(500).json({
            success: false,
            message: "Erro interno no servidor."
        })
    }
}