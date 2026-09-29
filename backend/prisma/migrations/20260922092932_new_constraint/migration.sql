/*
  Warnings:

  - A unique constraint covering the columns `[nif]` on the table `farmacia` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `farmacia_nif_key` ON `farmacia`(`nif`);
