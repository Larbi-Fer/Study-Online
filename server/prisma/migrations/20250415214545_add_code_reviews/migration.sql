-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('admin', 'student', 'code_reviewer') NOT NULL DEFAULT 'student';

-- CreateTable
CREATE TABLE `code_reviews` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `reviewerId` VARCHAR(191) NULL,
    `subject` VARCHAR(191) NOT NULL,
    `explication` VARCHAR(191) NOT NULL,
    `code` LONGTEXT NOT NULL,
    `programmeId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comments` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `code_reviews` ADD CONSTRAINT `code_reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `code_reviews` ADD CONSTRAINT `code_reviews_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `code_reviews` ADD CONSTRAINT `code_reviews_programmeId_fkey` FOREIGN KEY (`programmeId`) REFERENCES `programmes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
