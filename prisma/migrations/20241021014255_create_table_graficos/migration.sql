-- CreateTable
CREATE TABLE `graficos` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `dashbardId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `graficos` ADD CONSTRAINT `graficos_dashbardId_fkey` FOREIGN KEY (`dashbardId`) REFERENCES `dashboards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
