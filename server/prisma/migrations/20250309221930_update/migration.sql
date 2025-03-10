/*
  Warnings:

  - A unique constraint covering the columns `[id,number]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `topics` ADD COLUMN `number` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `lessons_id_number_key` ON `lessons`(`id`, `number`);
