/*
  Warnings:

  - You are about to drop the column `hash_anterior` on the `vendas` table. All the data in the column will be lost.
  - You are about to drop the column `hash_assinatura` on the `vendas` table. All the data in the column will be lost.
  - You are about to drop the column `numero_fatura` on the `vendas` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `vendas_numero_fatura_key` ON `vendas`;

-- AlterTable
ALTER TABLE `medicamentos` ALTER COLUMN `taxa_iva_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `vendas` DROP COLUMN `hash_anterior`,
    DROP COLUMN `hash_assinatura`,
    DROP COLUMN `numero_fatura`;

-- CreateTable
CREATE TABLE `fatura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo_fatura` VARCHAR(191) NOT NULL,
    `serie` VARCHAR(191) NOT NULL,
    `ano` INTEGER NOT NULL,
    `sequencial` INTEGER NOT NULL,
    `venda_id` INTEGER NOT NULL,
    `hash_assinatura` VARCHAR(191) NULL,
    `hash_anterior` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `fatura_codigo_fatura_key`(`codigo_fatura`),
    UNIQUE INDEX `fatura_venda_id_key`(`venda_id`),
    UNIQUE INDEX `fatura_serie_ano_sequencial_key`(`serie`, `ano`, `sequencial`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fatura` ADD CONSTRAINT `fatura_venda_id_fkey` FOREIGN KEY (`venda_id`) REFERENCES `vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
