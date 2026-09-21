/*
  Warnings:

  - Added the required column `hash_assinatura` to the `notas_credito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notas_credito` ADD COLUMN `hash_anterior` VARCHAR(191) NULL,
    ADD COLUMN `hash_assinatura` VARCHAR(191) NOT NULL;
