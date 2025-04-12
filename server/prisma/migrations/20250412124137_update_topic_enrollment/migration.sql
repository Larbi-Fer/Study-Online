-- AlterTable
ALTER TABLE `topic_enrollments` ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `currentLessonId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `topic_enrollments` ADD CONSTRAINT `topic_enrollments_currentLessonId_fkey` FOREIGN KEY (`currentLessonId`) REFERENCES `lessons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
