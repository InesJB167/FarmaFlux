import jwt from "jsonwebtoken"

export const autenticar = (req, res, next)=>{
    try{
        const autorizacao = req.headers.authorization
        if(!autorizacao){
            return res.status(400).json({message:"Requisição sem autorização!"})
        } 

        //verificar se a autorizaçao esta no formato certo
        const partes = autorizacao.split(" ")
        if(partes.length !== 2){
            console.log("formato do token invalido")
            return res.status(401).json({
                message:"Token inválido!"
            })
        }
        
        const token = autorizacao.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                message:"Acesso negado!"
            })
        }
        
        //guardando dados 
        req.user = decoded
        console.log("verificando token",decoded)

        next()

    } catch(error){
        console.log("erro detetado no middleware",error)
        return res.status(401).json({message:"token inválido"})
    }
}