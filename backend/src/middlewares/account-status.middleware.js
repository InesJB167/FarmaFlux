import prisma from "../../prisma/prisma.js"

export const verificarStatusConta = async (req, res, next) => {

    try {

        const username = req.body.username

        if(username === undefined ) return res.status(400).json({message: "Informe os dados para a autenticação."})

        if (!username) {
            return res.status(400).json({ message: "campo obrigatório" })
        }

        if (!username.trim()) {
            return res.status(400).json({ message: "Campo obrigatório!" })
        }

        const verificarUtilizador = await prisma.utilizadores.findUnique({
            where: {
                username: username,
                deleted_at: null
            },
            select:{
                id: true,
                status: true
            }
        })

        //verificar se o utilizador existe
        if (!verificarUtilizador) {
            console.log("o user não encontrado")
            return res.status(404).json({ message: "usuário não encontrado!" })
        }

        //verificar o status do user
        switch (verificarUtilizador.status) {
            case "PENDENTE":
                return res.status(403).json({ message: "Conta aguardando avaliação!" })

            case "REJEITADO":
                return res.status(403).json({ message: "Conta inválida!" })

            case "INATIVO":
                return res.status(403).json({ message: "Conta inativa!" })

            case "ATIVO":
                return next()

            default:
                console.log("staus nao identificado")
                return res.status(500).json({
                    message: "Status da conta inválido."
                })
        }

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}