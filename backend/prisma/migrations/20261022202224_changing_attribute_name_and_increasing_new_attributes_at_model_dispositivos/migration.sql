/*
  Warnings:

  - You are about to drop the column `id_hardware` on the `dispositivos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[device_id]` on the table `dispositivos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `device_id` to the `dispositivos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fingerPrint` to the `dispositivos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `dispositivos_id_hardware_key` ON `dispositivos`;

-- AlterTable
ALTER TABLE `dispositivos` DROP COLUMN `id_hardware`,
    ADD COLUMN `ativo` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `device_id` VARCHAR(38) NOT NULL,
    ADD COLUMN `fingerPrint` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `dispositivos_device_id_key` ON `dispositivos`(`device_id`);
