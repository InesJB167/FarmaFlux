import prisma from "../../prisma/prisma.js"

export const verificarStatusConta = async (req, res, next) => {

    try {
        /**
         * !apenas users com o status ativo(ativo: true) podem acessar o sistema e realizar as demais atividades no mesmo.
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
        if (!username) {
            return res.status(400).json({ messge: "campo obrigatório" })
        } 
        
        if (!username.trim()) {
            return res.status(400).json({ message: "Campo obrigatório!" })
        }
        console.log("username: ", username)

        const verificarUtilizador = await prisma.utilizadores.findUnique({
            where: {
                username: username
            }
        })

        //verificar se o utilizador existe
        if (!verificarUtilizador) {
            console.log("o user não encontrado")
            return res.status(404).json({ message: "usuário não encontrado!" })
        }

        //verificar o status do user
        if (!verificarUtilizador.ativo) {
            console.log("usuário inativo no banco de dados")
            return res.status(403).json({ message: " usuário inativo!" })
        }

        console.log("status do user ", verificarUtilizador.ativo)

        next()

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }
}