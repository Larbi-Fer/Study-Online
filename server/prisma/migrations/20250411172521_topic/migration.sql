-- AlterTable
ALTER TABLE `topics` ADD COLUMN `type` ENUM('required', 'optional') NOT NULL DEFAULT 'optional';

-- CreateTable
CREATE TABLE `topic_enrollments` (
    `userId` VARCHAR(191) NOT NULL,
    `topicId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `topicId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TopicDependencies` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_TopicDependencies_AB_unique`(`A`, `B`),
    INDEX `_TopicDependencies_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `topic_enrollments` ADD CONSTRAINT `topic_enrollments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `topic_enrollments` ADD CONSTRAINT `topic_enrollments_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `topics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TopicDependencies` ADD CONSTRAINT `_TopicDependencies_A_fkey` FOREIGN KEY (`A`) REFERENCES `topics`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TopicDependencies` ADD CONSTRAINT `_TopicDependencies_B_fkey` FOREIGN KEY (`B`) REFERENCES `topics`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
