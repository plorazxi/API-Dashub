/*
  Warnings:

  - You are about to drop the column `userid` on the `dashboards` table. All the data in the column will be lost.
  - You are about to drop the column `dashbardId` on the `graficos` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `dashboards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_dash` to the `graficos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordem` to the `graficos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `dashboards` DROP FOREIGN KEY `dashboards_userid_fkey`;

-- DropForeignKey
ALTER TABLE `graficos` DROP FOREIGN KEY `graficos_dashbardId_fkey`;

-- DropForeignKey
ALTER TABLE `referencias` DROP FOREIGN KEY `referencias_graficoId_fkey`;

-- AlterTable
ALTER TABLE `dashboards` DROP COLUMN `userid`,
    ADD COLUMN `id_user` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `graficos` DROP COLUMN `dashbardId`,
    ADD COLUMN `id_dash` VARCHAR(191) NOT NULL,
    ADD COLUMN `ordem` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `dashboards` ADD CONSTRAINT `dashboards_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `graficos` ADD CONSTRAINT `graficos_id_dash_fkey` FOREIGN KEY (`id_dash`) REFERENCES `dashboards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `referencias` ADD CONSTRAINT `referencias_graficoId_fkey` FOREIGN KEY (`graficoId`) REFERENCES `graficos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
