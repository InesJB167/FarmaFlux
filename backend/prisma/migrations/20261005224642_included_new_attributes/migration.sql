/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id]` on the table `farmacia` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `farmacia` ADD COLUMN `data_validade_licenca` DATETIME(3) NULL,
    ADD COLUMN `tenant_id` VARCHAR(191) NULL,
    ADD COLUMN `ultima_verificacao` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `farmacia_tenant_id_key` ON `farmacia`(`tenant_id`);
