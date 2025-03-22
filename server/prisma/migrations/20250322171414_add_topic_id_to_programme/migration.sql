-- AlterTable
ALTER TABLE `programmes` ADD COLUMN `topicId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `programmes` ADD CONSTRAINT `programmes_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `topics`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
