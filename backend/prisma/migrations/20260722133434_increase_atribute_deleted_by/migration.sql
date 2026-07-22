-- AlterTable
ALTER TABLE `utilizadores` ADD COLUMN `deleted_by` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `utilizadores` ADD CONSTRAINT `utilizadores_deleted_by_fkey` FOREIGN KEY (`deleted_by`) REFERENCES `utilizadores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
