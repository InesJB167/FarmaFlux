import prisma from "../../../prisma/prisma.js"
import bcrypt from "bcrypt"

export const entrar = async (nome_user,senha)=>{

    try{
        const verficar_user = await prisma.utilizadores.findUnique({
        where:{
            username: nome_user
        }
    })

    if(!verficar_user){
        return{
            success: false,
            message: "Usuário não encontrado!"
        }
    }

    const senha_hash = verficar_user.password_hash    
    const verificar_senha = await bcrypt.compare(senha, senha_hash)
    
    if(!verificar_senha){
        return {
            success: false,
            message:"senha inválida!"
        }
    }
    //gerar token aqui
    console.log("o user pode entrar no sistema!")
    return {
        success: true,
        message: "Login efetuado com sucesso!"
    }

    } catch(error){
        //melhor assim ,o erro sobe pra o controller
        throw error
    }
    
}