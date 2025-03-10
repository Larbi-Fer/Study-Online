/*
  Warnings:

  - A unique constraint covering the columns `[id,topicId]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `lessonId` VARCHAR(191) NULL,
    ADD COLUMN `topicId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `lessons_id_topicId_key` ON `lessons`(`id`, `topicId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_lessonId_topicId_fkey` FOREIGN KEY (`lessonId`, `topicId`) REFERENCES `lessons`(`id`, `topicId`) ON DELETE SET NULL ON UPDATE CASCADE;
