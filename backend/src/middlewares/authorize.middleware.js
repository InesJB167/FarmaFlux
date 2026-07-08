
export const authorization = (roles) => {
    try {
        /**
         * criar uma funçao que verifica se o user com determindo role tem acesso ou não a determinada rota
         * 
         * para isso preciso saber como o middleware vai impedir o acesso a determinado role e quando isso deve ser feito
         * 
         * vai existir rotas que permitem apenas 
         * 
         * admin
         * 
         * admin, gerente
         * 
         * admin, gerente, operador
         * 
         * como impedir o acesso a determinado role ??
         */

        const verificar_roles = (req, res, next) => {

            const user_role = req.user.role
            console.log("role do user",user_role)

            const acess = roles.includes(user_role)
            if (!acess) {
                console.log("role não permitido ,acesso negado!")
                return res.status(403).json({ message: "acesso negado !" })
            }

            next()
        }

        return verificar_roles

    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "acesso negado" })
    }

}