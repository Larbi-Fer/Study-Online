-- AlterTable
ALTER TABLE `programmes` MODIFY `description` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `challenges` (
    `userId` VARCHAR(191) NOT NULL,
    `programmeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`userId`, `programmeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `challenges` ADD CONSTRAINT `challenges_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `challenges` ADD CONSTRAINT `challenges_programmeId_fkey` FOREIGN KEY (`programmeId`) REFERENCES `programmes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
