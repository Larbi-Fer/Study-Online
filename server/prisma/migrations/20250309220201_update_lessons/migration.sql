/*
  Warnings:

  - You are about to drop the column `topicId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_lessonId_topicId_fkey`;

-- DropIndex
DROP INDEX `User_lessonId_topicId_fkey` ON `User`;

-- DropIndex
DROP INDEX `lessons_id_topicId_key` ON `lessons`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `topicId`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
