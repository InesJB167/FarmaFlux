import jwt from "jsonwebtoken"
import { buscarTenantPorId } from "../modules/tenants/repository/buscarTenantPorId.js"
import prisma from "../../prisma/prisma.js"
import { buscarDispositivoPorId } from "../modules/dispositivos/repos/buscarDispositivoPorId.js"

export const verificarSubscricaoLicensa = async (req, res, next) =>
{
    try {
        const autorizacao = req.headers["x-device-token"]
        if (!autorizacao) return res.status(400).json({ message: "Requisição sem a devida autorização." })

        const partesToken = autorizacao.split(" ")

        if (partesToken.length !== 2 || partesToken[0] !== "Bearer") {
            return res.status(401).json({ message: "Token do dispositivo inválido." })
        }

        const tokenDispositivo = autorizacao.split(" ")[1]
        const secret = process.env.JWT_SECRET
        const decodificar = jwt.verify(tokenDispositivo, secret)

        const tipoToken = decodificar.type
        if (tipoToken !== "dispositivo") {
            return res.status(401).json({ message: "Token inválido." })
        }

        const tenant = await buscarTenantPorId(decodificar.tenant_id)
        if (!tenant) return res.status(404).json({ message: "Tenant não encontrado." })

        if (tenant.estado !== "ATIVO" || !tenant.data_proximo_pagamento || tenant.data_proximo_pagamento < new Date()) return res.status(402).json({ message: "Licensa expirada." })

        const dispositivo = await buscarDispositivoPorId(decodificar.id)
        if (!dispositivo) return res.status(404).json({ message: "Dispositivo não encontrado." })

        const registrarUltimoAcesso = await prisma.dispositivos.update({
            where: {
                id: dispositivo.id
            },
            data: {
                ultimo_acesso: new Date()
            },
            select: {
                id: true,
                ultimo_acesso: true
            }
        })

        res.set("x-subscricao-valida-ate", tenant.data_proximo_pagamento.toISOString())
        req.device = decodificar

        next()

    } catch (error) {
        if (
            error instanceof jwt.TokenExpiredError ||
            error instanceof jwt.JsonWebTokenError
        ) {
            return res.status(401).json({
                message: "Token inválido ou expirado."
            })
        }

        console.error("Erro no middleware de licença:", error)

        return res.status(500).json({
            message: "Erro interno do servidor."
        })
    }
}