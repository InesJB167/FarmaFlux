import {validarId} from "../../../utils/validar-id.js"
import { suspenderTenantService } from "../service/suspender-tenant.service.js"

export const suspenderTenant = async (req,res)=>{
    try {
        const idUser =req.user.id
        const idTenant = parseInt(req.params.id)

        if(!idTenant || !validarId(idTenant)) return res.status(400).json({message: "Id tenant inválido."})

        const suspender = await suspenderTenantService(idUser, idTenant)
        return res.status(suspender.status).json(suspender)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}