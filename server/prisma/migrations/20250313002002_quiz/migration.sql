/*
  Warnings:

  - A unique constraint covering the columns `[topicId]` on the table `Quizzes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lessonId]` on the table `Quizzes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Quizzes` MODIFY `topicId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Quizzes_topicId_key` ON `Quizzes`(`topicId`);

-- CreateIndex
CREATE UNIQUE INDEX `Quizzes_lessonId_key` ON `Quizzes`(`lessonId`);

-- AddForeignKey
ALTER TABLE `Quizzes` ADD CONSTRAINT `Quizzes_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `topics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quizzes` ADD CONSTRAINT `Quizzes_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `lessons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
