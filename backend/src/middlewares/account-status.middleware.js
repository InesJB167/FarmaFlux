import prisma from "../../prisma/prisma.js"

export const verificarStatusConta = async (req, res, next) => {

    try {
        /**
         * !apenas users com o status ativo podem acessar o sistema e realizar as demais atividades no mesmo.
         * 
         * ? ao fazer o login o sistema deve verificar se o user esta ativo ou inativo
         * 
         * *como verificar se o user esta ativo a partir do login??
         * nesse caso não temos o id ainda ,podemos usar o username que é um atributo unico pra verificar se o user esta ativo ou não ..
         * 
         * *se eu fizer a verificação do status logo no login do user vai ser necesssário verificar nas demais rotas ??
         * sendo que os users inativos não terão acesso será desnecessário verificar as demais rotas ,pois se não tiver acesso ao sistema não terá acesso as demais funcionalidades
         * 
         */
        const username = req.body.username

        if(username === undefined ) return res.status(400).json({message: "Informe os dados para a autenticação."})

        if (!username) {
            return res.status(400).json({ message: "campo obrigatório" })
        }

        if (!username.trim()) {
            return res.status(400).json({ message: "Campo obrigatório!" })
        }
        console.log("username: ", username)

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
                console.log("status da conta:", verificarUtilizador.status)
                return res.status(403).json({ message: "Conta aguardando avaliação!" })

            case "REJEITADO":
                console.log("status da conta:", verificarUtilizador.status)
                return res.status(403).json({ message: "Conta inválida!" })

            case "INATIVO":
                console.log("status da conta:", verificarUtilizador.status)
                return res.status(403).json({ message: "Conta inativa!" })

            case "ATIVO":
                console.log("status do user ", verificarUtilizador.status)
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