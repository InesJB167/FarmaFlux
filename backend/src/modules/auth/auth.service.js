import prisma from "../../../prisma/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {buscarDispositivoPorId} from "../dispositivos/repos/buscarDispositivoPorId.js"
import {buscarTenantPorId} from "../tenants/repository/buscarTenantPorId.js"
import {buscarFarmaciaPorId} from "../farmacia/repository/buscarFarmaciaPorId.js"

export const entrar = async (idDispositivo,username, senha) =>
{
    try {
        const dispositivo = await buscarDispositivoPorId(idDispositivo)
        if(!dispositivo) return {
            success: false,
            status: 404,
            message: "Dispositivo não encontrado."
        }

        const tenant = await buscarTenantPorId(dispositivo.tenant_id_fk)
        if(!tenant) return {
            success: false,
            status: 404,
            message: "Tenant do dispositivo não encontrado."
        }

        const farmacia = await buscarFarmaciaPorId(tenant.farmacia.id)
        if(!tenant.farmacia || !farmacia) return {
            success: false,
            status: 404,
            message: "Farmácia não encontrada."
        }

        const farmacia_id = farmacia.id

        //?para o login de usuário é necessario uma busca composta para achar o user relacionado a farmácia correspondente.
        const verficar_user = await prisma.utilizadores.findUnique({
            where: {
                farmacia_id_username: {farmacia_id,username},
                deleted_at: null
            }
        })

        if (!verficar_user) {

            console.log("User não encontrado")
            return {
                success: false,
                message: "Credenciais inválidas."
            }

        }

        const senha_hash = verficar_user.password_hash
        const verificar_senha = await bcrypt.compare(senha, senha_hash)

        if (!verificar_senha) {
            console.log("senha inválida!")
            return {
                success: false,
                message: "Credenciais inválidas."
            }

        }
        //gerar token aqui
        const secret = process.env.JWT_SECRET
        const payload = {
            id: verficar_user.id,
            username: verficar_user.username,
            role: verficar_user.role,
            status: verficar_user.status,//mudei algo aqui ...de ativo pra o novo atributo status
            farmacia_id: verficar_user.farmacia_id
        }


        const token = jwt.sign(
            payload,
            secret,
            {
                expiresIn: "8h"
            }
        )
        
        return {
            success: true,
            message: "Login efetuado com sucesso!",
            data: token
        }

    } catch (error) {
        //melhor assim ,o erro sobe pra o controller
        throw error
    }

}