-- CreateTable
CREATE TABLE `categorias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `deleted_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `categorias_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `localizacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `zona` VARCHAR(100) NOT NULL,
    `estante` VARCHAR(50) NOT NULL,
    `nivel` VARCHAR(50) NOT NULL,
    `descricao` VARCHAR(200) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `principio_ativo` VARCHAR(191) NULL,
    `dosagem` VARCHAR(191) NULL,
    `preco_venda` DECIMAL(15, 2) NOT NULL,
    `stock_minimo` INTEGER NOT NULL,
    `deleted_at` DATETIME(3) NULL,
    `categoria_id` INTEGER NOT NULL,
    `localizacao_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `barcodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicamento_id` INTEGER NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `barcodes_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_empresa` VARCHAR(150) NOT NULL,
    `nif` VARCHAR(20) NOT NULL,
    `contacto` VARCHAR(50) NOT NULL,
    `endereco` VARCHAR(200) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `fornecedores_nif_key`(`nif`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lotes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicamento_id` INTEGER NOT NULL,
    `fornecedor_id` INTEGER NOT NULL,
    `numero_lote` VARCHAR(191) NOT NULL,
    `data_validade` DATETIME(3) NOT NULL,
    `qtd_inicial` INTEGER NOT NULL,
    `qtd_atual` INTEGER NOT NULL,
    `preco_custo` DECIMAL(15, 2) NOT NULL,
    `nif_fornecedor` VARCHAR(20) NOT NULL,
    `data_entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `lotes_nif_fornecedor_key`(`nif_fornecedor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilizadores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'GERENTE', 'OPERADOR') NOT NULL DEFAULT 'OPERADOR',
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `utilizadores_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilizador_id` INTEGER NOT NULL,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total_bruto` DECIMAL(15, 2) NOT NULL,
    `total_desconto` DECIMAL(15, 2) NOT NULL,
    `status` ENUM('DRAFT', 'PARKED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'COMPLETED',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itens_venda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `venda_id` INTEGER NOT NULL,
    `lote_id` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `preco_unitario` DECIMAL(15, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `venda_id` INTEGER NOT NULL,
    `metodo` ENUM('DINHEIRO', 'TPA', 'TRANSFERENCIA') NOT NULL DEFAULT 'DINHEIRO',
    `valor_pago` DECIMAL(15, 2) NOT NULL,
    `troco` DECIMAL(15, 2) NOT NULL,
    `referencia_manual` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logs_auditoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `utilizador_id` INTEGER NOT NULL,
    `acao` ENUM('CREATE', 'UPDATE', 'DELETE', 'CANCELAR_VENDA', 'AJUSTE_STOCK', 'ALTERAR_PRECO', 'ALTERAR_ROLE') NOT NULL DEFAULT 'UPDATE',
    `tabela` VARCHAR(191) NOT NULL,
    `id_registro` INTEGER NOT NULL,
    `valor_antigo` JSON NULL,
    `valor_novo` JSON NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_localizacao_id_fkey` FOREIGN KEY (`localizacao_id`) REFERENCES `localizacoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `barcodes` ADD CONSTRAINT `barcodes_medicamento_id_fkey` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotes` ADD CONSTRAINT `lotes_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lotes` ADD CONSTRAINT `lotes_medicamento_id_fkey` FOREIGN KEY (`medicamento_id`) REFERENCES `medicamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vendas` ADD CONSTRAINT `vendas_utilizador_id_fkey` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itens_venda` ADD CONSTRAINT `itens_venda_venda_id_fkey` FOREIGN KEY (`venda_id`) REFERENCES `vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itens_venda` ADD CONSTRAINT `itens_venda_lote_id_fkey` FOREIGN KEY (`lote_id`) REFERENCES `lotes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pagamentos` ADD CONSTRAINT `pagamentos_venda_id_fkey` FOREIGN KEY (`venda_id`) REFERENCES `vendas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs_auditoria` ADD CONSTRAINT `logs_auditoria_utilizador_id_fkey` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
