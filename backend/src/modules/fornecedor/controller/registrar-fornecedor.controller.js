import { registrarFornecedorService } from "../service/registrar-fornecedor.service.js"
import jwt from "jsonwebtoken"
import { decodificarToken } from "../../../utils/decodificandoToken.js"

export const registrarNovoFornecedor = async (req, res) =>
{
    try {
        const nome_empresa = req.body.nome_empresa?.trim()
        const nif = req.body.nif?.trim()
        const contacto = req.body.contacto?.trim()
        const endereco = req.body.endereco?.trim()
        const authorization = req.headers.authorization
        const token = decodificarToken(authorization)

        if (!authorization || !token) return res.status(400).json({ message: "Token inválido ou mal formatado." })

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const farmaciaId = parseInt(payload.farmacia_id)

        if (!farmaciaId) return res.status(400).json({ message: "Farmácia id faltando" })

        if (nome_empresa === undefined && nif === undefined && contacto === undefined && endereco === undefined) return res.status(400).json({ message: "Informe os dados para o registro do fornecedor." })

        if (!nome_empresa || !nif || !contacto) return res.status(400).json({ message: "Campo obrigatório." })

        const dadosParaRegistro = {
            nome_empresa,
            nif,
            contacto,
            endereco
        }

        const registrarFornecedor = await registrarFornecedorService(dadosParaRegistro,farmaciaId)

        if (!registrarFornecedor.success) return res.status(registrarFornecedor.status).json(registrarFornecedor)

        return res.status(registrarFornecedor.status).json(registrarFornecedor)

    } catch (error) {
        console.log(error)
        if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) return res.status(401).json({message:"Token inválido ou expirado."})
        return res.status(500).json({ error: error.message })
    }
}