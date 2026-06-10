//allowed to use the environment variables
import dotenv from "dotenv";
dotenv.config()

import app from "./app.js";
import prisma from "./prisma/prisma.js";

async function server() {
    
    const port = process.env.PORT

    try {

        await prisma.$connect()
        console.log("Conexão com o banco de dados estabelecida!")
        app.listen(port || 3000)
        console.log("Servidor rodando na porta:",port)

    } catch (error) {
        console.log("Não foi possivel rodar o servidor! Erro na conexão com o banco!",error)
    }
}

server()