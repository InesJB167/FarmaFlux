-- AlterTable
ALTER TABLE `clientes` ADD COLUMN `provincia` VARCHAR(191) NOT NULL DEFAULT 'Luanda';

-- AlterTable
ALTER TABLE `farmacia` ADD COLUMN `provincia` VARCHAR(191) NOT NULL DEFAULT 'Luanda';
