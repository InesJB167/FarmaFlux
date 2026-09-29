/*
  Warnings:

  - A unique constraint covering the columns `[codigo_legal]` on the table `taxas_iva` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `taxas_iva_codigo_legal_key` ON `taxas_iva`(`codigo_legal`);
