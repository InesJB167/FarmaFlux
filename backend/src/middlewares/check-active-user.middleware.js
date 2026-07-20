import prisma from "../../prisma/prisma.js"

export const verificarUtilizadorAtivo = async (req, res, next)=>{
    try {
        const idUser = req.user.id 

        const utilizador = await prisma.utilizadores.findUnique({
            where:{
                id: idUser
            },
            select:{
                status: true
            }
        })

        if(!utilizador){
            console.log("user não existe")
            return res.status(404).json({message:"usuário não encontrado"})
        }

        switch(utilizador.status){
            case "PENDENTE":
                return res.status(403).json({message:"Conta aguardando avaliação."})
            case "REJEITADO":
                return res.status(403).json({ message: "Conta inválida!" })
            case "INATIVO":
                return res.status(403).json({ message: "Conta inativa!" })

            case "ATIVO":
                console.log("status do user ", utilizador.status)
                return next()
                break
            default:
                console.log("staus nao identificado",utilizador.status)
                return res.status(500).json({
                    message: "Status da conta inválido."
                })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error.message)
    }
}