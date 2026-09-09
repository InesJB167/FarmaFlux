import PDFDocument from "pdfkit"

// ---------- Cores ----------
const AZUL_ESCURO = "#0F3D6E"
const AZUL_MEDIO = "#1E5FA8"
const AZUL_CLARO_FUNDO = "#EAF1FA"
const CINZA_TEXTO = "#333333"
const CINZA_LINHA = "#E3E9F0"
const BRANCO = "#FFFFFF"

const MARGEM = 40

function formatarMoeda(valor, moeda = "MT") {
    const numero = Number(valor) || 0
    const formatado = numero.toLocaleString("pt-AO", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    return `${formatado} ${moeda}`
}

/**
 * Gera o PDF do comprovativo de venda e devolve um Buffer.
 *
 * @param {Object} comprovativo - objeto devolvido por gerarComprovativoVendaService
 * @param {number|string} comprovativo.idVenda
 * @param {string} comprovativo.nomeFarmacia
 * @param {string} comprovativo.dataVenda 
 * @param {Array}  comprovativo.itensVenda - [{ nomeMedicamento, quantidade, precoUnitario, subtotal }]
 * @param {number} comprovativo.valorTotalVenda
 * @param {string} comprovativo.metodoPagamento
 * @param {number} comprovativo.valorRecebido
 * @param {number} comprovativo.troco
 * @param {Object} [farmacia] - dados adicionais da farmácia (opcional, com valores por omissão)
 * @returns {Promise<Buffer>}
 */

export const gerarPdfComprovativo = (comprovativo, farmacia = {}) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: "A4", margin: MARGEM })
        const larguraPagina = doc.page.width
        const larguraUtil = larguraPagina - MARGEM * 2

        const chunks = []
        doc.on("data", (chunk) => chunks.push(chunk))
        doc.on("end", () => resolve(Buffer.concat(chunks)))
        doc.on("error", reject)

        const dadosFarmacia = {
            endereco: farmacia.endereco || "",
            cidade: farmacia.cidade || "",
            telefone: farmacia.telefone || "",
            nif: farmacia.nif || "",
            ...farmacia
        }

        // ---------- Cabeçalho: logo + nome ----------
        const logoX = MARGEM
        const logoY = MARGEM
        doc.roundedRect(logoX, logoY, 34, 34, 6).fill(AZUL_MEDIO)
        doc.fillColor(BRANCO)
        doc.rect(logoX + 13, logoY + 6, 8, 22).fill(BRANCO)
        doc.rect(logoX + 5, logoY + 14, 24, 8).fill(BRANCO)

        doc.font("Helvetica-Bold").fontSize(22)
        doc.fillColor(AZUL_ESCURO)
        doc.text("Farma", logoX + 42, logoY, { continued: true })
        doc.fillColor(AZUL_MEDIO)
        doc.text("Flux")

        doc.font("Helvetica").fontSize(9.5).fillColor(CINZA_TEXTO)
        doc.text("Mais saúde, todos os dias.", logoX + 42, logoY + 26)

        // ---------- Cabeçalho: dados da farmácia (direita) ----------
        const nomeFarmacia = comprovativo.nomeFarmacia || "Farmácia"
        doc.font("Helvetica-Bold").fontSize(11).fillColor(AZUL_ESCURO)
        doc.text(nomeFarmacia, MARGEM, logoY, { width: larguraUtil, align: "right" })

        doc.font("Helvetica").fontSize(8.5).fillColor(CINZA_TEXTO)
        const linhasFarmacia = [
            dadosFarmacia.endereco,
            dadosFarmacia.cidade,
            dadosFarmacia.telefone ? `Tel: ${dadosFarmacia.telefone}` : "",
            dadosFarmacia.nif ? `NIF: ${dadosFarmacia.nif}` : ""
        ].filter(Boolean)

        let yInfoFarmacia = logoY + 16
        for (const linha of linhasFarmacia) {
            doc.text(linha, MARGEM, yInfoFarmacia, { width: larguraUtil, align: "right" })
            yInfoFarmacia += 11
        }

        // ---------- Linha divisória ----------
        let y = Math.max(logoY + 70, yInfoFarmacia + 10)
        doc.strokeColor(AZUL_MEDIO).lineWidth(1.4)
        doc.moveTo(MARGEM, y).lineTo(larguraPagina - MARGEM, y).stroke()

        // ---------- Título ----------
        y += 22
        doc.font("Helvetica-Bold").fontSize(22).fillColor(AZUL_ESCURO)
        doc.text("Fatura de Venda", MARGEM, y, { width: larguraUtil, align: "center" })

        y += 30
        doc.font("Helvetica-Bold").fontSize(13)
        doc.text(`N\u00b0 ${comprovativo.idVenda}`, MARGEM, y, { width: larguraUtil, align: "center" })

        // ---------- Caixa de informações (venda | cliente) ----------
        y += 28
        const alturaCaixaInfo = 70
        doc.roundedRect(MARGEM, y, larguraUtil, alturaCaixaInfo, 4).fill(AZUL_CLARO_FUNDO)

        const meioX = MARGEM + larguraUtil / 2

        function campo(x, yy, label, valor) {
            doc.font("Helvetica-Bold").fontSize(9).fillColor(AZUL_ESCURO)
            const larguraLabel = doc.widthOfString(label + "  ")
            doc.text(label, x, yy)
            doc.font("Helvetica").fontSize(9).fillColor(CINZA_TEXTO)
            doc.text(String(valor ?? "\u2014"), x + larguraLabel, yy)
        }

        let linhaY = y + 12
        campo(MARGEM + 12, linhaY, "Data e Hora:", comprovativo.dataVenda)
        campo(meioX + 12, linhaY, "Cliente:", comprovativo.clienteNome || "Consumidor Final")
        linhaY += 16
        campo(MARGEM + 12, linhaY, "Farmácia:", nomeFarmacia)
        campo(meioX + 12, linhaY, "NIF:", comprovativo.clienteNif || "\u2014")
        linhaY += 16
        campo(MARGEM + 12, linhaY, "Terminal:", comprovativo.terminal || "\u2014")
        campo(meioX + 12, linhaY, "Tipo de Venda:", comprovativo.tipoVenda || "Normal")
        linhaY += 16
        campo(MARGEM + 12, linhaY, "Operador:", comprovativo.operador || "\u2014")

        doc.strokeColor("#C7D6E8").lineWidth(0.7)
        doc.moveTo(meioX, y + 6).lineTo(meioX, y + alturaCaixaInfo - 6).stroke()

        y += alturaCaixaInfo + 24

        // ---------- Tabela de itens ----------
        const direita = MARGEM + larguraUtil
        const colX = {
            item: MARGEM,
            descricao: MARGEM + 34,
            qtd: direita - 235,
            preco: direita - 145,
            subtotal: direita - 6
        }

        const alturaCabecalho = 24
        doc.rect(MARGEM, y, larguraUtil, alturaCabecalho).fill(AZUL_ESCURO)
        doc.font("Helvetica-Bold").fontSize(9.5).fillColor(BRANCO)
        doc.text("Item", colX.item + 6, y + 7)
        doc.text("Descrição", colX.descricao, y + 7)
        doc.text("Qtd.", colX.qtd - 20, y + 7, { width: 40, align: "center" })
        doc.text("Preço Unitário", colX.preco - 90, y + 7, { width: 90, align: "right" })
        doc.text("Subtotal", colX.subtotal - 90, y + 7, { width: 90, align: "right" })

        y += alturaCabecalho

        const alturaLinha = 24
        const itens = comprovativo.itensVenda || []

        itens.forEach((item, idx) => {
            if (idx % 2 === 1) {
                doc.rect(MARGEM, y, larguraUtil, alturaLinha).fill("#F5F8FC")
            }
            doc.font("Helvetica-Bold").fontSize(9.5).fillColor(AZUL_ESCURO)
            doc.text(String(idx + 1), colX.item + 6, y + 7)

            doc.font("Helvetica").fontSize(9.5).fillColor(CINZA_TEXTO)
            doc.text(item.nomeMedicamento, colX.descricao, y + 7, { width: colX.qtd - colX.descricao - 10 })
            doc.text(String(item.quantidade), colX.qtd - 20, y + 7, { width: 40, align: "center" })
            doc.text(formatarMoeda(item.precoUnitario), colX.preco - 90, y + 7, { width: 90, align: "right" })
            doc.text(formatarMoeda(item.subtotal), colX.subtotal - 90, y + 7, { width: 90, align: "right" })

            doc.strokeColor(CINZA_LINHA).lineWidth(0.5)
            doc.moveTo(MARGEM, y + alturaLinha).lineTo(direita, y + alturaLinha).stroke()

            y += alturaLinha
        })

        y += 20

        // ---------- Caixa de totais ----------
        const larguraTotais = 220
        const totaisX = direita - larguraTotais
        const desconto = comprovativo.desconto || 0
        const linhasTotais = [
            { label: "Total de Itens:", valor: String(itens.length), destaque: false },
            { label: "Subtotal:", valor: formatarMoeda(comprovativo.valorTotalVenda), destaque: false },
            { label: "Desconto:", valor: formatarMoeda(desconto), destaque: false },
            { label: "Total da Venda:", valor: formatarMoeda(comprovativo.valorTotalVenda - desconto), destaque: true }
        ]

        const alturaLinhaTotal = 22
        for (const { label, valor, destaque } of linhasTotais) {
            doc.rect(totaisX, y, larguraTotais, alturaLinhaTotal).fill(destaque ? AZUL_ESCURO : AZUL_CLARO_FUNDO)
            doc.font("Helvetica-Bold").fontSize(destaque ? 11 : 9.5)
            doc.fillColor(destaque ? BRANCO : AZUL_ESCURO)
            doc.text(label, totaisX + 10, y + 6)
            doc.font(destaque ? "Helvetica-Bold" : "Helvetica").fontSize(destaque ? 12 : 9.5)
            doc.fillColor(destaque ? BRANCO : CINZA_TEXTO)
            doc.text(valor, totaisX + 10, y + 6, { width: larguraTotais - 20, align: "right" })
            y += alturaLinhaTotal
        }

        y += 24

        // ---------- Caixa de pagamento ----------
        const alturaPagamento = 60
        doc.roundedRect(MARGEM, y, larguraUtil, alturaPagamento, 4).fill(AZUL_CLARO_FUNDO)

        let py = y + 12
        campo(MARGEM + 12, py, "Forma de Pagamento:", comprovativo.metodoPagamento)
        py += 18
        campo(MARGEM + 12, py, "Valor Recebido:", formatarMoeda(comprovativo.valorRecebido))
        py += 18
        campo(MARGEM + 12, py, "Troco:", formatarMoeda(comprovativo.troco))

        y += alturaPagamento + 26

        // ---------- Agradecimento ----------
        doc.font("Helvetica-Bold").fontSize(12).fillColor(AZUL_MEDIO)
        doc.text("Obrigado pela sua preferência!", MARGEM, y, { width: larguraUtil, align: "center" })
        y += 16
        doc.font("Helvetica").fontSize(9).fillColor(CINZA_TEXTO)
        doc.text(farmacia.rodape || "FarmaFlux - Cuidando de si e da sua família.", MARGEM, y, {
            width: larguraUtil,
            align: "center"
        })

        // ---------- Identificação da venda (sem biblioteca de código de barras) ----------
        // Nota: pdfkit não gera códigos de barras nativamente. Para um código de barras
        // real (ex: Code128), instala e usa uma lib como "bwip-js" e insere a imagem aqui.
        y += 26
        doc.font("Helvetica").fontSize(9).fillColor(CINZA_TEXTO)
        doc.text(`N\u00ba da Venda: ${comprovativo.idVenda}`, MARGEM, y, { width: larguraUtil, align: "center" })

        doc.end()
    })
}
