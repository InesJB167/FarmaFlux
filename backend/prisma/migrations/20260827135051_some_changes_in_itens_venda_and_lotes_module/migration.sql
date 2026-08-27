/*
  Warnings:

  - You are about to drop the column `lote_id` on the `itens_venda` table. All the data in the column will be lost.
  - Added the required column `medicamento_id` to the `itens_venda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `itens_venda` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `itens_venda` DROP FOREIGN KEY `itens_venda_lote_id_fkey`;

-- DropIndex
DROP INDEX `itens_venda_lote_id_fkey` ON `itens_venda`;

-- AlterTable
ALTER TABLE `itens_venda` DROP COLUMN `lote_id`,
    ADD COLUMN `lotesId` INTEGER NULL,
    ADD COLUMN `medicamento_id` INTEGER NOT NULL,
    ADD COLUMN `subtotal` DECIMAL(15, 2) NOT NULL;

-- CreateTable
CREATE TABLE `item_retirado_lote` (
    `id_lote` INTEGER NOT NULL,
    `id_item_venda` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`id_lote`, `id_item_venda`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itens_venda` ADD CONSTRAINT `itens_venda_medicamento_id_fkey` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itens_venda` ADD CONSTRAINT `itens_venda_lotesId_fkey` FOREIGN KEY (`lotesId`) REFERENCES `lotes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_retirado_lote` ADD CONSTRAINT `item_retirado_lote_id_lote_fkey` FOREIGN KEY (`id_lote`) REFERENCES `lotes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_retirado_lote` ADD CONSTRAINT `item_retirado_lote_id_item_venda_fkey` FOREIGN KEY (`id_item_venda`) REFERENCES `itens_venda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
