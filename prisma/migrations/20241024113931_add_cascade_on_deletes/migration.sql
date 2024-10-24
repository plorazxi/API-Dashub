-- DropForeignKey
ALTER TABLE `dashboards` DROP FOREIGN KEY `dashboards_userid_fkey`;

-- DropForeignKey
ALTER TABLE `graficos` DROP FOREIGN KEY `graficos_dashboardId_fkey`;

-- DropForeignKey
ALTER TABLE `referencias` DROP FOREIGN KEY `referencias_graficoId_fkey`;

-- AddForeignKey
ALTER TABLE `dashboards` ADD CONSTRAINT `dashboards_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `graficos` ADD CONSTRAINT `graficos_dashboardId_fkey` FOREIGN KEY (`dashboardId`) REFERENCES `dashboards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `referencias` ADD CONSTRAINT `referencias_graficoId_fkey` FOREIGN KEY (`graficoId`) REFERENCES `graficos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
