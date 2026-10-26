    import prisma from "../../../../prisma/prisma.js"
    import { buscarCodigoAtivacao } from "../../codigos_ativacao/repos/buscarCodigoAtivacao.js"
    import { buscarDispositivoPorDeviceId } from "../repos/buscarDispositivoPorDeviceId.js"
    import jwt from "jsonwebtoken"

    export const ativarDispositivoService = async (codigo, deviceId, fingerPrint) =>
    {
        const codigoAtivacao = await buscarCodigoAtivacao(codigo)
        if (!codigoAtivacao) return {
            success: false,
            status: 404,
            message: "Codigo ativação não encontrado."
        }

        if (codigoAtivacao.codigo_usado === true) return {
            success: false,
            status: 409,
            message: "Este codigo ativação ja foi usado."
        }

        if (codigoAtivacao.expira_em && codigoAtivacao.expira_em < new Date()) return {
            success: false,
            status: 403,
            message: "Acesso negado: código expirado."
        }

        if (codigoAtivacao.tenant.estado !== "ATIVO") return {
            success: false,
            status: 403,
            message: "Acesso negado: tenant inativo."
        }

        const limiteDispositivos = codigoAtivacao.tenant.limite_dispositivos
        const dispositivosConectados = codigoAtivacao.tenant.dispositivos

        if (dispositivosConectados.length >= limiteDispositivos) return {
            success: false,
            status: 409,
            message: "Limite de dispositivos atingido: Ja não é possível se conectar a este tenant."
        }

        //? se o dispositivo ja existe mas há a necessidade de ser reativado...
        let dispositivo = await buscarDispositivoPorDeviceId(deviceId)
        if (!dispositivo) {
            dispositivo = await prisma.dispositivos.create({
                data: {
                    tenant_id_fk: codigoAtivacao.tenant_id_fk,
                    device_id: deviceId,
                    fingerPrint: fingerPrint
                }
            })
        }

        const registrarAtivacaoDispositivos = await prisma.$transaction(async (tx) =>
        {
            const payload = {
                tenant_id: codigoAtivacao.tenant_id_fk,
                type: "dispositivo",
                id: dispositivo.id
            }
            const secret = process.env.JWT_SECRET
            const token = jwt.sign(
                payload,
                secret,
                { expiresIn: "8h" }
            )

            const atualizarDispositivo = await tx.dispositivos.update({
                where:{
                    id: dispositivo.id
                },
                data:{
                    token_jwt: token,
                    ativo: true
                },
                select:{
                    id: true,
                    token_jwt: true
                }
            })

            await tx.codigos_ativacao.update({
                where: {
                    id: codigoAtivacao.id
                },
                data: {
                    codigo_usado: true
                },
                select: {
                    id: true,
                    codigo: true,
                    codigo_usado: true
                }
            })

            return {
                atualizarDispositivo
            }
        })

        return {
            success: true,
            status: 201,
            message: "Dispositivo ativado com sucesso.",
            data: registrarAtivacaoDispositivos
        }
    }