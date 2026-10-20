//neste arquivo vai alguns dados iniçiais pra o banco de dados
import dotenv from "dotenv"
dotenv.config()

import prisma from "./prisma.js"
import bcrypt from "bcrypt";

async function main()
{

    const senhaAdmin = process.env.ADMIN_PASSWORD
    const senhaSuperAdmin = process.env.SUPER_ADMIN_PASSWORD
    if (!senhaAdmin || !senhaSuperAdmin) {
        throw new Error("Senhas não definidas no .env")
    }

    const hashAdmin = await bcrypt.hash(senhaAdmin, 10)
    const hashSuperAdmin = await bcrypt.hash(senhaSuperAdmin, 10)

    //?creating user client
    const user = await prisma.utilizadores.upsert({
        where: {
            username: "admin"
        },

        update: {
            nome: "Administrador",
            password_hash: hashAdmin,
            role: "ADMIN",
            status: "ATIVO"
        },

        create: {
            username: "admin",
            nome: "Administrador",
            password_hash: hashAdmin,
            role: "ADMIN",
            status: "ATIVO"
        }

    })

    //? creating user dev
    const superUser = await prisma.utilizadores.upsert({
        where: {
            username: "superUser"
        },
        update: {
            nome: "Super user",
            username: "superUser",
            password_hash: hashSuperAdmin,
            role: "SUPER_ADMIN",
            status: "ATIVO"
        },
        create: {
            nome: "Super user",
            username: "superUser",
            password_hash: hashSuperAdmin,
            role: "SUPER_ADMIN",
            status: "ATIVO"
        }
    })

    // ---------- Taxas de IVA ----------
    await prisma.taxas_iva.upsert({
        where: {
            codigo_legal: "ISE"
        },
        update: {
            codigo_legal: "ISE",
            percentagem: 0.00,
            motivo_de_insercao_iva: "Isento - medicamentos e especialidades farmacêuticas"
        },
        create: {
            codigo_legal: "ISE",
            percentagem: 0.00,
            motivo_de_insercao_iva: "Isento - medicamentos e especialidades farmacêuticas"
        }
    })

    await prisma.taxas_iva.upsert({
        where: {
            codigo_legal: "NOR"
        },
        update: {
            codigo_legal: "NOR",
            percentagem: 14.00,
            motivo_de_insercao_iva: "Taxa normal - produtos não farmacêuticos"
        },
        create: {
            codigo_legal: "NOR",
            percentagem: 14.00,
            motivo_de_insercao_iva: "Taxa normal - produtos não farmacêuticos"
        }
    })

    // ---------- Cliente genérico (Consumidor Final) ----------
    await prisma.clientes.upsert({
        where: {
            nif: "999999999"
        },
        update: {
            nif: "999999999",
            nome: "Consumidor Final",
            endereco: null
        },
        create: {
            nif: "999999999",
            nome: "Consumidor Final",
            endereco: null
        }
    })


    console.log("Seed executado com sucesso!");
    console.log(`Admin ${user.username} criado/atualizado com sucesso! /n Super User ${superUser.username} criado/atualizado .`)
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
