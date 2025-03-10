/*
  Warnings:

  - A unique constraint covering the columns `[topicId,number]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `programmes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `programmes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `lessons_id_number_key` ON `lessons`;

-- AlterTable
ALTER TABLE `programmes` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `goal` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `lessons_topicId_number_key` ON `lessons`(`topicId`, `number`);
