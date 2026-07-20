import { atualizarUtilizadorService } from "../service/atualizar-utilizador.service.js"
import bcrypt from "bcrypt"

export const atualizarUtilizador = async (req, res) => {
    try {
       
        const idUser = req.user.id

        if (!idUser) {
            console.log("id do user a ser procurado ", idUser)
            return res.status(400).json({ message: "erro ao identificar o user" })
        }

        const { nome, username, senha } = req.body
        let hash

        if (!nome?.trim() && !username?.trim() && !senha) {
            return res.status(400).json({ message: "Informe um campo pra ser atualizado!" })
        }

        if (senha) {

            if (senha.length < 8) {
                return res.status(400).json({ message: "minimo 8 caracteres!" })
            }
            hash = await bcrypt.hash(senha, 12)
        }

        //servce
        const atualizar = await atualizarUtilizadorService(idUser, nome, username, hash)
        if (!atualizar.success) {
            return res.status(404).json(atualizar)
        }

        return res.json(atualizar)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}