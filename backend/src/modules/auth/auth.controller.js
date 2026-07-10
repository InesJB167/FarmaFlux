import {entrar} from "./auth.service.js"

export const login = async (req,res)=>{
    const username = req.body.username
    const senha = req.body.senha

    if(!username || !senha){
        return res.status(400).json({message:"Preencha todos os campos!"})
    }

    try{
        //aqui vai a funçao do service
    const logar_sistema = await entrar(username,senha)
    if(!logar_sistema.success){
        return res.status(400).json(logar_sistema)
    }

    console.log("Login efetuado com sucesso!")
    return res.json(logar_sistema)

    } catch(error){
        console.log(error)

        res.status(500).json({
            success: false,
            message:"Erro interno no servidor."
        })
    }
}