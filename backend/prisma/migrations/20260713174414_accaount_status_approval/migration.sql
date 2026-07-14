/*
  Warnings:

  - You are about to drop the column `timestamp` on the `logs_auditoria` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `utilizadores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `logs_auditoria` DROP COLUMN `timestamp`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `acao` ENUM('CREATE', 'LOGIN', 'UPDATE', 'DELETE', 'CANCELAR_VENDA', 'AJUSTE_STOCK', 'ALTERAR_PRECO', 'ALTERAR_ROLE') NOT NULL DEFAULT 'UPDATE';

-- AlterTable
ALTER TABLE `utilizadores` DROP COLUMN `ativo`,
    ADD COLUMN `approved_at` DATETIME(3) NULL,
    ADD COLUMN `approved_by` INTEGER NULL,
    ADD COLUMN `rejected_at` DATETIME(3) NULL,
    ADD COLUMN `rejected_by` INTEGER NULL,
    ADD COLUMN `status` ENUM('PENDENTE', 'ATIVO', 'INATIVO', 'REJEITADO') NOT NULL DEFAULT 'PENDENTE';

-- AddForeignKey
ALTER TABLE `utilizadores` ADD CONSTRAINT `utilizadores_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utilizadores` ADD CONSTRAINT `utilizadores_rejected_by_fkey` FOREIGN KEY (`rejected_by`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
