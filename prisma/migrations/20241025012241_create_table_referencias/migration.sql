-- CreateTable
CREATE TABLE `referencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `graficoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `referencias` ADD CONSTRAINT `referencias_graficoId_fkey` FOREIGN KEY (`graficoId`) REFERENCES `graficos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
