import { validarId } from "../../../utils/validar-id.js"
import { registrarFarmaciaService } from "../service/registrar-farmacia.service.js"

export const registrarFarmacia = async (req, res) =>
{
    try {
        const idUser = req.user.id
        const { nif,
            razao_social,
            nome_comercial,
            provincia,
            telefone,
            morada,
            numero_certificado_software
        } = req.body
        const tenantId = parseInt(req.params.id)

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

        const novoRegistro = await registrarFarmaciaService(idUser,tenantId,dadosFarmacia)
        return res.status(novoRegistro.status).json(novoRegistro)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}