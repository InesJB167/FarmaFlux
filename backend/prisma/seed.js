//neste arquivo vai alguns dados iniçiais pra o banco de dados
import dotenv from "dotenv"
dotenv.config()

import prisma from "./prisma.js"
import bcrypt from "bcrypt";

async function main()
{

    const senha = process.env.ADMIN_PASSWORD
    if (!senha) {
        throw new Error("Senha não definida no .env")
    }

    const hash = await bcrypt.hash(senha, 10)
    const user = await prisma.utilizadores.upsert({
        where: {
            username: "admin"
        },

        update: {
            nome: "Administrador",
            password_hash: hash,
            role: "ADMIN",
            status: "ATIVO"
        },

        create: {
            username: "admin",
            nome: "Administrador",
            password_hash: hash,
            role: "ADMIN",
            status: "ATIVO"
        }

    })

    // ---------- Farmácia (única linha) ----------
    await prisma.farmacia.upsert({
        where: {
            nif: "5417234567"
        },
        update: {
            nif: "5417234567",
            razao_social: "FarmaFlux Distribuição de Medicamentos, Lda",
            nome_comercial: "Farmácia FarmaFlux",
            morada: "Rua Rainha Ginga, nº 45, Ingombota, Luanda",
            telefone: "+244 923 456 789",
            numero_certificado_software: "000/TESTE/AGT"
        },
        create: {
            nif: "5417234567",
            razao_social: "FarmaFlux Distribuição de Medicamentos, Lda",
            nome_comercial: "Farmácia FarmaFlux",
            morada: "Rua Rainha Ginga, nº 45, Ingombota, Luanda",
            telefone: "+244 923 456 789",
            numero_certificado_software: "000/TESTE/AGT"
        }
    })

    // ---------- Taxas de IVA ----------
    await prisma.taxas_iva.upsert({
        where: {
            codigo_legal: "ISE"
        },
        update: {},
        create: {
            data: {
                codigo_legal: "ISE",
                percentagem: 0.00,
                motivo_de_insercao_iva: "Isento - medicamentos e especialidades farmacêuticas"
            }
        }
    })

    await prisma.taxas_iva.upsert({
        where: {
            codigo_legal: "NOR"
        },
        update: {},
        create: {
            data: {
                codigo_legal: "NOR",
                percentagem: 14.00,
                motivo_de_insercao_iva: "Taxa normal - produtos não farmacêuticos"
            }
        }
    })

    // ---------- Cliente genérico (Consumidor Final) ----------
    await prisma.clientes.create({
        data: {
            nif: "999999999",
            nome: "Consumidor Final",
            endereco: null
        }
    })

    console.log("Seed executado com sucesso!");
    console.log(`Admin ${user.username} criado/atualizado com sucesso!`)
}

main()
    .catch((err) =>
    {
        console.log("Erro ao executar o seed!", err)
    })
    .finally(async () =>
    {
        await prisma.$disconnect()
    })
