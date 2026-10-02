import { create } from "xmlbuilder2"
import { gerarArquivoSaftService } from "../service/gerarArquivoSaft.service.js"

export const gerarArquivoSaftXml = async (dataInicio, dataFim) => {
    const dadosSaft = await gerarArquivoSaftService(dataInicio, dataFim)

    if (!dadosSaft.success && dadosSaft.success !== undefined) {
        return dadosSaft
    }

    const { farmacia, clientes, medicamentos, taxasIva, dadosComerciais } = dadosSaft

    const doc = create({ version: "1.0", encoding: "UTF-8" })
    const auditFile = doc.ele("AuditFile", { xmlns: "urn:OECD:StandardAuditFile-Tax:AO_1.01_01" })

    const agora = new Date()
    const dataISO = (d) => new Date(d).toISOString().slice(0, 10)
    const dataHoraISO = (d) => new Date(d).toISOString().slice(0, 19)

    // ---------- Header (ordem exigida pelo XSD) ----------
    auditFile
        .ele("Header")
            .ele("AuditFileVersion").txt("1.01_01").up()
            .ele("CompanyID").txt(String(farmacia.nif)).up()
            .ele("TaxRegistrationNumber").txt(String(farmacia.nif)).up()
            .ele("TaxAccountingBasis").txt("F").up() // F = Facturação
            .ele("CompanyName").txt(farmacia.razao_social).up()
            .ele("CompanyAddress")
                .ele("AddressDetail").txt(farmacia.morada).up()
                .ele("City").txt(farmacia.provincia).up() // TODO: adicionado novo campo
                .ele("Country").txt("AO").up()
            .up()
            .ele("FiscalYear").txt(String(new Date(dataInicio).getFullYear())).up()
            .ele("StartDate").txt(dataISO(dataInicio)).up()
            .ele("EndDate").txt(dataISO(dataFim)).up()
            .ele("CurrencyCode").txt("AOA").up()
            .ele("DateCreated").txt(dataISO(agora)).up()
            .ele("TaxEntity").txt("Sede").up() // valor comum por omissão
            .ele("ProductCompanyTaxID").txt("777777777").up() // TODO: confirmar - deve ser o NIF do fabricante do software, não da farmácia mas por enquanto temos um ficticio
            .ele("SoftwareValidationNumber").txt("0").up() // "0" enquanto não houver certificação real
            .ele("ProductID").txt("FarmaFlux/1.0").up() // formato exigido: nome/versão
            .ele("ProductVersion").txt("1.0").up()
        .up()

    // ---------- MasterFiles ----------
    const masterFiles = auditFile.ele("MasterFiles")

    // Customer (ordem: CustomerID, AccountID, CustomerTaxID, CompanyName, BillingAddress, SelfBillingIndicator)
    for (const cliente of clientes) {
        masterFiles
            .ele("Customer")
                .ele("CustomerID").txt(String(cliente.id)).up()
                .ele("AccountID").txt("Desconhecido").up() // AccountID != NIF - é a conta do cliente na contabilidade; sem ela, posso usar "Desconhecido" (valor aceite pelo schema)
                .ele("CustomerTaxID").txt(cliente.nif).up()
                .ele("CompanyName").txt(cliente.nome).up()
                .ele("BillingAddress")
                    .ele("AddressDetail").txt(cliente.endereco || "Desconhecido").up()
                    .ele("City").txt(cliente.provincia || "Desconhecido").up() // TODO: não tens cidade separada do endereço - considerar adicionar campo
                    .ele("Country").txt("AO").up()
                .up()
                .ele("SelfBillingIndicator").txt("0").up()
            .up()
    }

    // Product (ordem: ProductType, ProductCode, ProductDescription, ProductNumberCode)
    for (const medicamento of medicamentos) {
        masterFiles
            .ele("Product")
                .ele("ProductType").txt("P").up()
                .ele("ProductCode").txt(String(medicamento.id)).up()
                .ele("ProductDescription").txt(medicamento.nome).up()
                .ele("ProductNumberCode").txt(String(medicamento.barcodes.codigo)).up() // TODO: aqui vai o código de produto (ex: código de barras)
            .up()
    }

    // TaxTable > TaxTableEntry (ordem: TaxType, TaxCode, Description, TaxPercentage)
    const taxTableNode = masterFiles.ele("TaxTable")
    for (const taxa of taxasIva) {
        taxTableNode
            .ele("TaxTableEntry")
                .ele("TaxType").txt("IVA").up()
                .ele("TaxCode").txt(taxa.codigo_legal).up() //  os valores são NOR/ISE/OUT/NA/NS 
                .ele("Description").txt(taxa.motivo_de_insercao_iva).up() 
                .ele("TaxPercentage").txt(String(taxa.percentagem)).up()
            .up()
    }

    // ---------- SourceDocuments > SalesInvoices ----------
    const sourceDocuments = auditFile.ele("SourceDocuments")
    const salesInvoicesNode = sourceDocuments.ele("SalesInvoices")

    const totalDebitGeral = 0 // facturas normais não geram "débito" no sentido contabilístico do OECD; mantém-se 0 salvo anulações
    const totalCreditGeral = dadosComerciais.reduce((soma, v) => soma + Number(v.dadosVenda.totalVenda), 0)

    salesInvoicesNode.ele("NumberOfEntries").txt(String(dadosComerciais.length)).up()
    salesInvoicesNode.ele("TotalDebit").txt(totalDebitGeral.toFixed(2)).up()
    salesInvoicesNode.ele("TotalCredit").txt(totalCreditGeral.toFixed(2)).up()

    dadosComerciais.forEach((dadoVenda, indice) => {
        const { dadosVenda, itensVenda, pagamento } = dadoVenda

        const invoiceNode = salesInvoicesNode.ele("Invoice")

        invoiceNode.ele("InvoiceNo").txt(dadosVenda.codigo).up() // formato exigido: "FT S001/1" (tipo ESPAÇO série/nº)

        invoiceNode
            .ele("DocumentStatus")
                .ele("InvoiceStatus").txt("N").up() // N = normal
                .ele("InvoiceStatusDate").txt(dataHoraISO(dadosVenda.dataEmissao)).up()
                .ele("SourceID").txt(dadosVenda.idUtilizador).up() 
                .ele("SourceBilling").txt("P").up() // P = produzido nesta aplicação
            .up()

        invoiceNode.ele("Hash").txt(dadosVenda.hash || "0").up()
        invoiceNode.ele("HashControl").txt("1").up() // TODO: confirmar significado exacto exigido (posição na cadeia/versão da chave)
        invoiceNode.ele("InvoiceDate").txt(dataISO(dadosVenda.dataEmissao)).up()
        invoiceNode.ele("InvoiceType").txt("FT").up()

        invoiceNode
            .ele("SpecialRegimes")
                .ele("SelfBillingIndicator").txt("0").up()
                .ele("CashVATSchemeIndicator").txt("0").up()
                .ele("ThirdPartiesBillingIndicator").txt("0").up()
            .up()

        invoiceNode.ele("SourceID").txt(dadoVenda.idUtilizador || "1").up() // TODO: idem - utilizador responsável
        invoiceNode.ele("SystemEntryDate").txt(dataHoraISO(dadosVenda.dataEmissao)).up()
        invoiceNode.ele("CustomerID").txt(String(dadosVenda.clienteId)).up()

        itensVenda.forEach((item, idx) => {
            const totalLinha = Number(item.quantidade) * Number(item.precoUnitario)

            const lineNode = invoiceNode.ele("Line")
            lineNode.ele("LineNumber").txt(String(idx + 1)).up()
            lineNode.ele("ProductCode").txt(String(item.medicamentoId ?? item.medicamento)).up() 
            lineNode.ele("ProductDescription").txt(item.medicamento).up()
            lineNode.ele("Quantity").txt(String(item.quantidade)).up()
            lineNode.ele("UnitOfMeasure").txt("UN").up()
            lineNode.ele("UnitPrice").txt(Number(item.precoUnitario).toFixed(2)).up()
            lineNode.ele("TaxPointDate").txt(dataISO(dadosVenda.dataEmissao)).up()
            lineNode.ele("Description").txt(item.medicamento).up()
            lineNode.ele("CreditAmount").txt(totalLinha.toFixed(2)).up()
            lineNode
                .ele("Tax")
                    .ele("TaxType").txt("IVA").up()
                    .ele("TaxCode").txt("ISE").up() // medicamentos são isentos - haverá mudança  se tiver algum item não-farmacêutico precisando de "NOR"
                    .ele("TaxPercentage").txt("0.00").up()
                .up()
        })

        const totalTax = 0 // isento
        const netTotal = itensVenda.reduce((s, i) => s + Number(i.quantidade) * Number(i.precoUnitario), 0)

        invoiceNode
            .ele("DocumentTotals")
                .ele("TaxPayable").txt(totalTax.toFixed(2)).up()
                .ele("NetTotal").txt(netTotal.toFixed(2)).up()
                .ele("GrossTotal").txt(Number(dadosVenda.totalVenda).toFixed(2)).up()

        if (pagamento && pagamento.length > 0) {
            for (const pag of pagamento) {
                invoiceNode.last().ele("Payment")
                    .ele("PaymentAmount").txt(Number(pag.valorPago).toFixed(2)).up()
                    .ele("PaymentDate").txt(dataISO(pag.dataPagamento)).up()
                .up()
            }
        }

        invoiceNode.last().up() // fecha DocumentTotals
    })

    return doc.end({ prettyPrint: true })
}