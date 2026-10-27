/*
  Warnings:

  - You are about to drop the column `utilizador_id` on the `farmacia` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[farmacia_id,codigo]` on the table `barcodes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[farmacia_id,nome]` on the table `categorias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[farmacia_id,nif]` on the table `clientes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[farmacia_id,codigo_fatura]` on the table `fatura` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[farmacia_id,nif]` on the table `fornecedores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codigo_nota,farmacia_id]` on the table `notas_credito` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[farmacia_id,username]` on the table `utilizadores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `farmacia_id` to the `barcodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmacia_id` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmacia_id` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmacia_id` to the `fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmacia_id` to the `fornecedores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmacia_id` to the `localizacoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmacia_id` to the `medicamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmacia_id` to the `notas_credito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmacia_id` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `farmacia` DROP FOREIGN KEY `farmacia_utilizador_id_fkey`;

-- DropIndex
DROP INDEX `barcodes_codigo_key` ON `barcodes`;

-- DropIndex
DROP INDEX `categorias_nome_key` ON `categorias`;

-- DropIndex
DROP INDEX `clientes_nif_key` ON `clientes`;

-- DropIndex
DROP INDEX `farmacia_utilizador_id_fkey` ON `farmacia`;

-- DropIndex
DROP INDEX `fatura_codigo_fatura_key` ON `fatura`;

-- DropIndex
DROP INDEX `fornecedores_nif_key` ON `fornecedores`;

-- DropIndex
DROP INDEX `notas_credito_codigo_nota_key` ON `notas_credito`;

-- DropIndex
DROP INDEX `utilizadores_username_key` ON `utilizadores`;

-- AlterTable
ALTER TABLE `barcodes` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `categorias` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `farmacia` DROP COLUMN `utilizador_id`;

-- AlterTable
ALTER TABLE `fatura` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `fornecedores` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `localizacoes` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `logs_auditoria` ADD COLUMN `farmacia_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `medicamentos` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `notas_credito` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `utilizadores` ADD COLUMN `farmacia_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `vendas` ADD COLUMN `farmacia_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `barcodes_farmacia_id_codigo_key` ON `barcodes`(`farmacia_id`, `codigo`);

-- CreateIndex
CREATE UNIQUE INDEX `categorias_farmacia_id_nome_key` ON `categorias`(`farmacia_id`, `nome`);

-- CreateIndex
CREATE UNIQUE INDEX `clientes_farmacia_id_nif_key` ON `clientes`(`farmacia_id`, `nif`);

-- CreateIndex
CREATE UNIQUE INDEX `fatura_farmacia_id_codigo_fatura_key` ON `fatura`(`farmacia_id`, `codigo_fatura`);

-- CreateIndex
CREATE UNIQUE INDEX `fornecedores_farmacia_id_nif_key` ON `fornecedores`(`farmacia_id`, `nif`);

-- CreateIndex
CREATE UNIQUE INDEX `notas_credito_codigo_nota_farmacia_id_key` ON `notas_credito`(`codigo_nota`, `farmacia_id`);

-- CreateIndex
CREATE UNIQUE INDEX `utilizadores_farmacia_id_username_key` ON `utilizadores`(`farmacia_id`, `username`);

-- AddForeignKey
ALTER TABLE `categorias` ADD CONSTRAINT `categorias_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `localizacoes` ADD CONSTRAINT `localizacoes_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barcodes` ADD CONSTRAINT `barcodes_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fornecedores` ADD CONSTRAINT `fornecedores_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utilizadores` ADD CONSTRAINT `utilizadores_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `vendas_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs_auditoria` ADD CONSTRAINT `logs_auditoria_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas_credito` ADD CONSTRAINT `notas_credito_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fatura` ADD CONSTRAINT `fatura_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
