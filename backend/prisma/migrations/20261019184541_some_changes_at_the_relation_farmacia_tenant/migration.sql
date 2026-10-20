/*
  Warnings:

  - You are about to drop the column `data_validade_licenca` on the `farmacia` table. All the data in the column will be lost.
  - You are about to drop the column `ultima_verificacao` on the `farmacia` table. All the data in the column will be lost.
  - You are about to drop the column `farmacia_id` on the `tenants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tenant_id_fk]` on the table `farmacia` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tenant_id_fk` to the `farmacia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tenants` DROP FOREIGN KEY `tenants_farmacia_id_fkey`;

-- DropIndex
DROP INDEX `tenants_farmacia_id_key` ON `tenants`;

-- AlterTable
ALTER TABLE `farmacia` DROP COLUMN `data_validade_licenca`,
    DROP COLUMN `ultima_verificacao`,
    ADD COLUMN `tenant_id_fk` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tenants` DROP COLUMN `farmacia_id`;

-- CreateIndex
CREATE UNIQUE INDEX `farmacia_tenant_id_fk_key` ON `farmacia`(`tenant_id_fk`);

-- AddForeignKey
ALTER TABLE `farmacia` ADD CONSTRAINT `farmacia_tenant_id_fk_fkey` FOREIGN KEY (`tenant_id_fk`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
