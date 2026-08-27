/*
  Warnings:

  - You are about to drop the column `lotesId` on the `itens_venda` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `itens_venda` DROP FOREIGN KEY `itens_venda_lotesId_fkey`;

-- DropIndex
DROP INDEX `itens_venda_lotesId_fkey` ON `itens_venda`;

-- AlterTable
ALTER TABLE `itens_venda` DROP COLUMN `lotesId`;
