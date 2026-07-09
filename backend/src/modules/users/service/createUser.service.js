import prisma from "../../../../prisma/prisma.js"

export const criar_utilizador = async (nome, username, password) => {

    const verficar_user = await prisma.utilizadores.findUnique({
        where: {
            username: username
        }
    })

    if (verficar_user) {
        console.log("ja existe um user com esse nome!")
        return {
            success: false,
            message: "Este nome de utilizador já está em uso."
        }
    }

    const novo_user = await prisma.utilizadores.create({
        data: {
            nome: nome,
            username: username,
            password_hash: password
        }
    })

    const usuario = {
        id: novo_user.id,
        nome: novo_user.nome,
        username: novo_user.username,
        role: novo_user.role
    }

    console.log("novo user ", novo_user.username)
    return {
        success: true,
        message: "usuário criado!",
        data: usuario
    }

}