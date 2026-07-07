import {entrar} from "./auth.service.js"

export const login = async (req,res)=>{
    const nome_user = req.body.nome_user
    const senha = req.body.senha

    if(!nome_user || !senha){
        return res.status(400).json({message:"Preencha todos os campos!"})
    }

    try{
        //aqui vai a funçao do service
    const logar_sistema = await entrar(nome_user,senha)
    if(logar_sistema.success === false){
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