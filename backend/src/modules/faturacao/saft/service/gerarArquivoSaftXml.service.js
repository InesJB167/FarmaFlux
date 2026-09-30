import { create } from "xmlbuilder2"
import { gerarArquivoSaftService } from "../service/gerarArquivoSaft.service.js"

/**
 * Gera o ficheiro XML do SAF-T (AO) de Facturação para um período.
 * Devolve a string XML pronta — quem chamar esta função decide se
 * grava em disco, envia como resposta HTTP, etc.
 */
export const gerarArquivoSaftXml = async (dataInicio, dataFim) => {
    const dadosSaft = await gerarArquivoSaftService(dataInicio, dataFim)

    if (!dadosSaft.success && dadosSaft.success !== undefined) {
        // o service pode devolver { success: false, ... } se a farmácia não existir
        return dadosSaft
    }

    const { farmacia, clientes, medicamentos, taxasIva, dadosComerciais } = dadosSaft

    // ---------- Documento raiz ----------
    const doc = create({ version: "1.0", encoding: "UTF-8" })
    const auditFile = doc.ele("AuditFile")

    // ---------- Header ----------
    auditFile
        .ele("Header")
            .ele("CompanyID").txt(String(farmacia.nif)).up()
            .ele("CompanyName").txt(farmacia.razao_social).up()
            .ele("CompanyAddress").txt(farmacia.morada).up()
            .ele("TaxRegistrationNumber").txt(String(farmacia.nif)).up()
            .ele("SoftwareCertificateNumber").txt(String(farmacia.numero_certificado_software)).up()
            .ele("StartDate").txt(new Date(dataInicio).toISOString().slice(0, 10)).up()
            .ele("EndDate").txt(new Date(dataFim).toISOString().slice(0, 10)).up()
            .ele("CurrencyCode").txt("AOA").up()
        .up()

    // ---------- MasterFiles ----------
    const masterFiles = auditFile.ele("MasterFiles")

    // Customer
    const customersNode = masterFiles.ele("Customer")
    for (const cliente of clientes) {
        customersNode
            .ele("Customer")
                .ele("CustomerID").txt(String(cliente.id)).up()
                .ele("TaxID").txt(cliente.nif).up()
                .ele("CompanyName").txt(cliente.nome).up()
                .ele("Address").txt(cliente.endereco || "").up()
            .up()
    }

    // Product
    const productsNode = masterFiles.ele("Product")
    for (const medicamento of medicamentos) {
        productsNode
            .ele("Product")
                .ele("ProductCode").txt(String(medicamento.id)).up()
                .ele("ProductDescription").txt(medicamento.nome).up()
                .ele("ProductType").txt("P").up() 
                .ele("TaxCode").txt(medicamento.taxas_ivas?.codigo_legal || "").up()
            .up()
    }

    // TaxTable
    const taxTableNode = masterFiles.ele("TaxTable")
    for (const taxa of taxasIva) {
        taxTableNode
            .ele("TaxTableEntry")
                .ele("TaxCode").txt(taxa.codigo_legal).up()
                .ele("TaxPercentage").txt(String(taxa.percentagem)).up()
                .ele("TaxDescription").txt(taxa.motivo_de_insercao_iva).up()
            .up()
    }

    // ---------- SourceDocuments ----------
    const sourceDocuments = auditFile.ele("SourceDocuments")
    const salesInvoicesNode = sourceDocuments.ele("SalesInvoices")

    for (const dadoVenda of dadosComerciais) {
        const { dadosVenda, itensVenda, notaCredito ,pagamento} = dadoVenda

        // Um invoice NOVO por cada venda - nunca reaproveitado entre iterações
        const invoiceNode = salesInvoicesNode.ele("Invoice")

        invoiceNode
            .ele("InvoiceNo").txt(dadosVenda.codigo).up()
            .ele("InvoiceDate").txt(new Date(dadosVenda.dataEmissao).toISOString().slice(0, 10)).up()
            .ele("CustomerID").txt(String(dadosVenda.clienteId ?? "")).up()
            .ele("Hash").txt(dadosVenda.hash || "").up()
            .ele("GrossTotal").txt(String(dadosVenda.totalVenda)).up()

        // Lines - um bloco próprio não partilhado com outros
        const linesNode = invoiceNode.ele("Lines")
        for (const item of itensVenda) {
            linesNode
                .ele("Line")
                    .ele("Product").txt(item.medicamento).up()
                    .ele("Quantity").txt(String(item.quantidade)).up()
                    .ele("UnitPrice").txt(String(item.precoUnitario)).up()
                    .ele("Tax").txt(String(item.imposto)).up()
                .up()
        }
          // Pagamentos associados a esta venda
        if (pagamento && pagamento.length > 0) {
            const paymentsNode = invoiceNode.ele("Payments")
            for (const pag of pagamento) {
                paymentsNode
                    .ele("Payment")
                        .ele("PaymentType").txt(pag.metodo).up()
                        .ele("PaymentDate").txt(new Date(pag.dataPagamento).toISOString().slice(0, 10)).up()
                        .ele("PaymentAmount").txt(String(pag.valorPago)).up()
                    .up()
            }
        }

        // Notas de crédito associadas a esta venda (se existirem)
        if (notaCredito && notaCredito.length > 0) {
            const creditNotesNode = invoiceNode.ele("CreditNotes")
            for (const nota of notaCredito) {
                creditNotesNode
                    .ele("CreditNote")
                        .ele("CreditNoteNo").txt(nota.numero).up()
                        .ele("ReferenceInvoice").txt(nota.facturaOriginal).up()
                        .ele("SettlementAmount").txt(String(nota.valorAnulado)).up()
                        .ele("Reason").txt(nota.motivo).up()
                        .ele("Date").txt(new Date(nota.data).toISOString().slice(0, 10)).up()
                    .up()
            }
        }
    }

    return doc.end({ prettyPrint: true })
}