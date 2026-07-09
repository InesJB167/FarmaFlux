import bcrypt from "bcrypt"
import { criar_utilizador } from "../service/createUser.service.js"

export const criar_user = async (req, res)=>{
    try {
        const {nome ,username ,senha} = req.body

        if(!nome.trim() || !username.trim() || !senha.trim()){
            console.log("algum campo vazio")
            return res.status(400).json({message:"preencha todos os campos!"})
        }

        if(senha.length < 8){
            return res.status(400).json({message:"minimo 8 caracteres!"})
        }

        const password = await bcrypt.hash(senha, 12)

        //funcao que vai criar o user aqui
        const user = await criar_utilizador(nome, username, password)

        if(!user.success){
            return res.status(409).json(user.message)
        }

        return res.json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}