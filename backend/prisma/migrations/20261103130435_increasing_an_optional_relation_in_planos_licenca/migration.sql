-- DropForeignKey
ALTER TABLE `planos_licenca` DROP FOREIGN KEY `planos_licenca_utilizador_id_fkey`;

-- DropIndex
DROP INDEX `planos_licenca_utilizador_id_fkey` ON `planos_licenca`;

-- AlterTable
ALTER TABLE `planos_licenca` MODIFY `utilizador_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `planos_licenca` ADD CONSTRAINT `planos_licenca_utilizador_id_fkey` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
