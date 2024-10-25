-- CreateTable
CREATE TABLE `graficos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `ordem` VARCHAR(191) NOT NULL,
    `id_dash` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `graficos` ADD CONSTRAINT `graficos_id_dash_fkey` FOREIGN KEY (`id_dash`) REFERENCES `dashboards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
