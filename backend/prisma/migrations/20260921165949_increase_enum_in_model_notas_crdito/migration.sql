/*
  Warnings:

  - You are about to alter the column `motivo` on the `notas_credito` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `notas_credito` MODIFY `motivo` ENUM('ERRO_FATURACAO', 'DEVOLUCAO_PRODUTO', 'PRODUTO_DEFEITUOSO', 'ANULACAO_VENDA', 'DESCONTO_POS_VENDA', 'TROCA_PRODUTO', 'OUTRO') NOT NULL DEFAULT 'ERRO_FATURACAO';
