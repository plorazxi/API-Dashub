-- CreateTable
CREATE TABLE `referencias` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `graficoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `referencias` ADD CONSTRAINT `referencias_graficoId_fkey` FOREIGN KEY (`graficoId`) REFERENCES `graficos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
