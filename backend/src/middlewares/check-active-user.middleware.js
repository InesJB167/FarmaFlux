import prisma from "../../prisma/prisma.js"

export const verificarUtilizadorAtivo = async (req, res, next)=>{
    try {
        const idUser = req.user.id 

        const utilizador = await prisma.utilizadores.findUnique({
            where:{
                id: idUser
            },
            select:{
                ativo: true
            }
        })

        if(!utilizador){
            console.log("user não existe")
            return res.status(404).json({message:"usuário não encontrado"})
        }

        if(!utilizador.ativo){
            console.log("user inativo")
            return res.status(403).json({message: "usuário inativo!"})
        }

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:error.message})
    }
}