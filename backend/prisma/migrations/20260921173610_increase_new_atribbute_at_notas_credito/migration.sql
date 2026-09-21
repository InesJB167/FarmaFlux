/*
  Warnings:

  - You are about to alter the column `numero_sequencial` on the `notas_credito` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[codigo_nota]` on the table `notas_credito` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo_nota` to the `notas_credito` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `notas_credito_numero_sequencial_key` ON `notas_credito`;

-- AlterTable
ALTER TABLE `notas_credito` ADD COLUMN `codigo_nota` VARCHAR(191) NOT NULL,
    MODIFY `numero_sequencial` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `notas_credito_codigo_nota_key` ON `notas_credito`(`codigo_nota`);
