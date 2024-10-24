/*
  Warnings:

  - You are about to drop the column `dashbardId` on the `graficos` table. All the data in the column will be lost.
  - Added the required column `dashboardId` to the `graficos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `graficos` DROP FOREIGN KEY `graficos_dashbardId_fkey`;

-- AlterTable
ALTER TABLE `graficos` DROP COLUMN `dashbardId`,
    ADD COLUMN `dashboardId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `graficos` ADD CONSTRAINT `graficos_dashboardId_fkey` FOREIGN KEY (`dashboardId`) REFERENCES `dashboards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
