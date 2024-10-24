/*
  Warnings:

  - Added the required column `ordem` to the `graficos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `graficos` ADD COLUMN `ordem` VARCHAR(191) NOT NULL;
