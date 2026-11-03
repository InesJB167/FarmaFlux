import { validarId } from "../../../utils/validar-id.js"
import { registrarFarmaciaService } from "../service/registrar-farmacia.service.js"
import jwt from "jsonwebtoken"

export const registrarFarmacia = async (req, res) =>
{
    try {
        const { nif,
            razao_social,
            nome_comercial,
            provincia,
            telefone,
            morada,
            numero_certificado_software
        } = req.body
        //? essa função permite que o user , após a ativação , registre o farmacia ...por isso é necessario que o token do dispositivo esteja disponivel no header da requisicao 
        const tenantToken = req.headers['x-device-token']

        const formatoToken = tenantToken.split(" ")
        
        if(!tenantToken || formatoToken.length !== 2) return res.status(400).json({message: "Token do dispositivo inválido ou mal formatado."})

        const token = formatoToken[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const tenantId = parseInt(payload.tenant_id)
        
        if(!tenantId || !validarId(tenantId)) return res.status(400).json({message: "Id tenant inválido."})

        if( !nif?.trim() || !razao_social?.trim() || !nome_comercial?.trim() || !provincia?.trim() || !telefone?.trim() || !morada?.trim() || !numero_certificado_software?.trim()) return res.status(400).json({message: "Preencha todos os campos."})

        const dadosFarmacia = {
            nif,
            razao_social,
            nome_comercial,
            provincia,
            telefone,
            morada,
            numero_certificado_software
        }

        const novoRegistro = await registrarFarmaciaService(tenantId,dadosFarmacia)
        return res.status(novoRegistro.status).json(novoRegistro)

    } catch (error) {
        console.log(error)
        if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({error: error.message})
        }
        return res.status(500).json({error: error.message})
    }
}