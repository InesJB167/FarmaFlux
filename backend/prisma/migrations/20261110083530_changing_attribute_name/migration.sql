/*
  Warnings:

  - You are about to drop the column `expira_em` on the `codigos_ativacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `codigos_ativacao` DROP COLUMN `expira_em`,
    ADD COLUMN `expirado_em` DATETIME(3) NULL;
