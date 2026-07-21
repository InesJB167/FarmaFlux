import prisma from "../../../../prisma/prisma.js"
import { buscarUtilizadorPorId } from "../repositories/user.repository.js"

export const atualizarUtilizadorService = async (idUser ,nome, username, hash )=>{
    try {
        /**
         * ?TAREFA: atualizar os dados que o user mandar
         * *verificar se o user existe
         * *agrupar os dados a serem atualizados
         * *verificar se os dados a serem atualizados são diferentes dos dados do banco
         * *se forem diferente atualize ..senao nao permita ...
         */

        const user = await buscarUtilizadorPorId(idUser)

        if(!user.success){
            return user
        }

        const dadosUser={
            nome: user.nome,
            username: user.username,
            password_hash: user.hash
        }
        console.log(dadosUser)

        const dadosNovos= {}

        if(nome?.trim()) dadosNovos.nome = nome
        if(username?.trim()) dadosNovos.username = username
        if(hash?.trim()) dadosNovos.password_hash = hash

        console.log(dadosNovos)
        /**
         * ?como eu posso verificar se os dados antigos nao sao os mesmos com os que vieram ??
         * *posso usar um loop pra percorrer os dadosnovos 
         * *e verificar se algum dos dados é diferente
         * *se for vai ser guardado pra a atualizaçao senao lança umma mensagem que nao há novos dados a serem atualizados
         */
        const dadosAtuais ={}

        for (const dado in dadosNovos){
            if(dadosNovos[dado] !== dadosUser[dado]){
                dadosAtuais[dado] = dadosNovos[dado]
            }
        }

        console.log(dadosAtuais)
        if(Object.keys(dadosAtuais).length === 0){
            return {
                success: false,
                message: "sem dados para a atualizaçao"
            }
        }

        const atualizar = await prisma.utilizadores.update({
            where:{
                id: idUser,
                deleted_at: null
            },
            data: dadosAtuais
        })

        if(!atualizar){
            return {
                success: false ,
                message: "erro ao atualizar user"
            }
        }

        const atualizacaoUser ={
            nome: atualizar.nome,
            username: atualizar.username,
        }

        return {
            success: true,
            message: "user atualizado!",
            data: atualizacaoUser
        }

    } catch (error) {
        throw new Error(error.message)
    }
}