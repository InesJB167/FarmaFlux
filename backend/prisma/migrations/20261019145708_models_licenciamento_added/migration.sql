/*
  Warnings:

  - You are about to drop the column `tenant_id` on the `farmacia` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `farmacia_tenant_id_key` ON `farmacia`;

-- AlterTable
ALTER TABLE `farmacia` DROP COLUMN `tenant_id`;

-- AlterTable
ALTER TABLE `utilizadores` MODIFY `role` ENUM('SUPER_ADMIN', 'ADMIN', 'GERENTE', 'OPERADOR') NOT NULL DEFAULT 'OPERADOR';

-- CreateTable
CREATE TABLE `tenants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id` VARCHAR(191) NOT NULL,
    `farmacia_id` INTEGER NOT NULL,
    `estado` ENUM('ATIVO', 'PENDENTE', 'SUSPENSO', 'CANCELADO') NOT NULL DEFAULT 'PENDENTE',
    `data_proximo_pagamento` DATETIME(3) NULL,
    `limite_dispositivos` INTEGER NOT NULL DEFAULT 5,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `utilizador_id` INTEGER NOT NULL,

    UNIQUE INDEX `tenants_tenant_id_key`(`tenant_id`),
    UNIQUE INDEX `tenants_farmacia_id_key`(`farmacia_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispositivos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id_fk` INTEGER NOT NULL,
    `id_hardware` VARCHAR(255) NOT NULL,
    `token_jwt` VARCHAR(500) NULL,
    `data_ativacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ultimo_acesso` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `dispositivos_id_hardware_key`(`id_hardware`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `codigos_ativacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(8) NOT NULL,
    `tenant_id_fk` INTEGER NOT NULL,
    `codigo_usado` BOOLEAN NOT NULL DEFAULT false,
    `expira_em` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `utilizador_id` INTEGER NOT NULL,

    UNIQUE INDEX `codigos_ativacao_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planos_licenca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(10) NOT NULL,
    `tipo` ENUM('MENSAL', 'TRIMESTRAL', 'SEMESTRAL', 'ANUAL') NOT NULL,
    `custo` DECIMAL(10, 2) NOT NULL,
    `duracao_dias` INTEGER NOT NULL,
    `utilizador_id` INTEGER NOT NULL,

    UNIQUE INDEX `planos_licenca_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamento_licenca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tenant_id_fk` INTEGER NOT NULL,
    `plano_id` INTEGER NOT NULL,
    `valor_pago` DECIMAL(10, 2) NOT NULL,
    `metodo` ENUM('DINHEIRO', 'TRANSFERENCIA') NOT NULL DEFAULT 'TRANSFERENCIA',
    `data_pagamento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_inicio` DATETIME(3) NOT NULL,
    `data_fim` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `referencia` VARCHAR(191) NOT NULL,
    `utilizador_id` INTEGER NOT NULL,

    UNIQUE INDEX `pagamento_licenca_referencia_key`(`referencia`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tenants` ADD CONSTRAINT `tenants_utilizador_id_fkey` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tenants` ADD CONSTRAINT `tenants_farmacia_id_fkey` FOREIGN KEY (`farmacia_id`) REFERENCES `farmacia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispositivos` ADD CONSTRAINT `dispositivos_tenant_id_fk_fkey` FOREIGN KEY (`tenant_id_fk`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codigos_ativacao` ADD CONSTRAINT `codigos_ativacao_utilizador_id_fkey` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `codigos_ativacao` ADD CONSTRAINT `codigos_ativacao_tenant_id_fk_fkey` FOREIGN KEY (`tenant_id_fk`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `planos_licenca` ADD CONSTRAINT `planos_licenca_utilizador_id_fkey` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamento_licenca` ADD CONSTRAINT `pagamento_licenca_utilizador_id_fkey` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamento_licenca` ADD CONSTRAINT `pagamento_licenca_tenant_id_fk_fkey` FOREIGN KEY (`tenant_id_fk`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamento_licenca` ADD CONSTRAINT `pagamento_licenca_plano_id_fkey` FOREIGN KEY (`plano_id`) REFERENCES `planos_licenca`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
