import {buscarTenantPorId} from "../../tenants/repository/buscarTenantPorId.js"
import { suspenderTenantRepository } from "../repository/suspenderTenant.js"

export const suspenderTenantService = async(idUser,idTenant)=>{
    const tenant = await buscarTenantPorId(idTenant)
    if(!tenant) return{
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    if(tenant.estado !== "ATIVO") return{
        success: false,
        status: 409,
        message: "Estado inativo: não é possível suspender este tenant."
    }

    const suspenderTenant = await suspenderTenantRepository(idUser,idTenant)

    return{
        success: true,
        status: 200,
        message: "Tenant suspenso.",
        data: suspenderTenant
    }
}