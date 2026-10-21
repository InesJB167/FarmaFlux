/*
  Warnings:

  - Added the required column `utilizador_id` to the `farmacia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `farmacia` ADD COLUMN `utilizador_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `farmacia` ADD CONSTRAINT `farmacia_utilizador_id_fkey` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
