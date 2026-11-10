import jwt from "jsonwebtoken"
import { buscarTenantPorId } from "../modules/tenants/repository/buscarTenantPorId.js"
import prisma from "../../prisma/prisma.js"
import { buscarDispositivoPorId } from "../modules/dispositivos/repos/buscarDispositivoPorId.js"

export const verificarSubscricaoLicensa = async (req, res, next) =>
{
    try {
        /**
         * ?este middleware verifica se a subscrição da licença ainda é válida, porém ela vai precisar do token gerado pelo dispositivo depois da sua ativação, o mesmo deve ser guardado localmente no dispositivo e na base de dados.
         */
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

        const tenant = await buscarTenantPorId(decodificar.tenant_id)
        if (!tenant) return res.status(404).json({ message: "Tenant não encontrado." })
            
        if (tenant.estado !== "ATIVO" || !tenant.data_proximo_pagamento || tenant.data_proximo_pagamento < new Date()) return res.status(402).json({ message: "AVISO: LICENÇA EXPIRADA /n Informamos que a licença de utilização do sistema expirou e, por esse motivo, o acesso a determinadas funcionalidades encontra-se temporariamente condicionado. Para continuar a utilizar o sistema normalmente, é necessário regularizar o pagamento da licença./n Solicitamos que efectue o pagamento correspondente com a maior brevidade possível, de modo a evitar interrupções prolongadas nas suas actividades e garantir a continuidade dos serviços disponibilizados pela plataforma. /n Após a confirmação do pagamento, a licença será renovada e o acesso ao sistema poderá ser restabelecido, de acordo com as condições do seu plano de subscrição. /n Caso já tenha efectuado o pagamento, pedimos que desconsidere esta notificação ou entre em contacto com o suporte para a confirmação e actualização do estado da sua licença./n Agradecemos a sua compreensão e colaboração. /n Para mais informações ou assistência no processo de renovação, entre em contacto com a nossa equipa de suporte." })

        res.set("x-subscricao-valida-ate", tenant.data_proximo_pagamento.toISOString())

        //?guardando o id da farmacia vai ser muito necessário
        req.farmacia = tenant.farmacia
        /**
         * !criei essa funçao para verificar a subscriçao da licença aantes do login
         */
        console.log("pass")
        next()

    } catch (error) {
        if ( error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token expirado."
            })
        } else if( error instanceof jwt.JsonWebTokenError ) {
            console.log("token invalido na verificaçao de licença")
            return res.status(401).json({
                message: "Token inválido."
            })
        }

        console.error("Erro no middleware de licença:", error)

        return res.status(500).json({
            message: "Erro interno do servidor."
        })
    }
}