import prisma from "../../../prisma/prisma.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const entrar = async (nome_user, senha) => {

    try {
            const verficar_user = await prisma.utilizadores.findUnique({
                where: {
                    username: nome_user
                }
            })

            if (!verficar_user) {
                
                console.log("User não encontrado")
                return {
                    success: false,
                    message: "Credenciais inválidas."
                }
                
            } else if (!verficar_user.ativo){

                console.log("usuário inativo no sistema")
                return {
                    success: false,
                    message: "Credenciais inválidas."
                }
                
            }

            const senha_hash = verficar_user.password_hash
            const verificar_senha = await bcrypt.compare(senha, senha_hash)

            if (!verificar_senha) {
                return {
                    success: false,
                    message: "Credenciais inválidas."
                }
                console.log("senha inválida!")
            }
            //gerar token aqui
            const secret = process.env.JWT_SECRET
            const payload = {
                id: verficar_user.id,
                username: verficar_user.username,
                role: verficar_user.role
            }


            const token = jwt.sign(
                payload,
                secret,
                {
                    expiresIn: "8h"
                }
            )

            console.log("o user pode entrar no sistema!")
            return {
                success: true,
                message: "Login efetuado com sucesso!",
                token
            }
    
    } catch (error){
        //melhor assim ,o erro sobe pra o controller
        throw error
    }

}