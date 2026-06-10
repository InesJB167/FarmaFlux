//neste arquivo vai alguns dados iniçiais pra o banco de dados
import dotenv from "dotenv"
dotenv.config()

import prisma from "./prisma.js"
import bcrypt from "bcrypt";

async function main() {

    const senha = process.env.ADMIN_PASSWORD
    if (!senha) {
        throw new Error("Senha não definida no .env")
    }

    const hash = await bcrypt.hash(senha, 10)
    const user = await prisma.utilizadores.upsert({
        where: {
            username: "admin"
        },

        update: {
            nome: "Administrador",
            password_hash: hash
        },

        create: {
            username: "admin",
            nome: "Administrador",
            password_hash: hash,
            role: "ADMIN",
            ativo: true,
        }

    })
    console.log("Seed executado com sucesso!");
    console.log(`Admin ${user.username} criado/atualizado com sucesso!`)
}

main()
    .catch((err) => {
        console.log("Erro ao executar o seed!", err)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
