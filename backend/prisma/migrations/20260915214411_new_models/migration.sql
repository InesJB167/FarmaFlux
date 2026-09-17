/*
  Warnings:

  - A unique constraint covering the columns `[numero_fatura]` on the table `vendas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cliente_id` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medicamentos` ADD COLUMN `taxa_iva_id` INTEGER NOT NULL DEFAULT 14;

-- AlterTable
ALTER TABLE `vendas` ADD COLUMN `cliente_id` INTEGER NOT NULL,
    ADD COLUMN `hash_anterior` VARCHAR(191) NULL,
    ADD COLUMN `hash_assinatura` VARCHAR(191) NULL,
    ADD COLUMN `numero_fatura` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `farmacia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nif` VARCHAR(20) NOT NULL,
    `razao_social` VARCHAR(191) NOT NULL,
    `nome_comercial` VARCHAR(100) NOT NULL,
    `morada` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(100) NOT NULL,
    `numero_certificado_software` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nif` VARCHAR(20) NOT NULL,
    `nome` VARCHAR(200) NOT NULL,
    `endereco` VARCHAR(191) NULL,

    UNIQUE INDEX `clientes_nif_key`(`nif`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxas_iva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_legal` VARCHAR(191) NOT NULL,
    `percentagem` DECIMAL(5, 2) NOT NULL,
    `motivo_de_insercao_iva` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas_credito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `venda_id` INTEGER NOT NULL,
    `motivo` VARCHAR(191) NOT NULL,
    `valor_anulado` DECIMAL(15, 2) NOT NULL,
    `numero_sequencial` VARCHAR(191) NOT NULL,
    `data_emissao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `notas_credito_numero_sequencial_key`(`numero_sequencial`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `vendas_numero_fatura_key` ON `vendas`(`numero_fatura`);

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_taxa_iva_id_fkey` FOREIGN KEY (`taxa_iva_id`) REFERENCES `taxas_iva`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `vendas_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas_credito` ADD CONSTRAINT `notas_credito_venda_id_fkey` FOREIGN KEY (`venda_id`) REFERENCES `vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
