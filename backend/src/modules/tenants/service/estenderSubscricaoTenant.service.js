import { buscarTenantPorId } from "../repository/buscarTenantPorId.js"
import { registrarPagamentoService } from "../../pagamento_licenca/service/registrar-pagamento.service.js"

export const estenderSubscricaoService = async (idTenant, dadosPagamento) =>
{
    const tenant = await buscarTenantPorId(idTenant)
    if (!tenant) return {
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    const statusTenant = tenant.estado
    if (statusTenant === "CANCELADO" || statusTenant === "PENDENTE") return {
        success: false,
        status: 409,
        message: "Não se pode estender a subscrição deste tenant."
    }

    const realizarPagamento = await registrarPagamentoService(idTenant, dadosPagamento)

    if(!realizarPagamento.success) return realizarPagamento

    return {
        success: true,
        status: 201,
        message: "Subscrição renovada com sucesso.",
        data: realizarPagamento.data
    }

}