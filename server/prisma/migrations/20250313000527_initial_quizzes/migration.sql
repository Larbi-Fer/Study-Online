-- AlterTable
ALTER TABLE `programmes` MODIFY `code` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `Quizzes` (
    `id` VARCHAR(191) NOT NULL,
    `type` ENUM('global', 'miniQuize') NOT NULL,
    `topicId` VARCHAR(191) NOT NULL,
    `lessonId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Questions` (
    `id` VARCHAR(191) NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `Choices` JSON NOT NULL,
    `correct` INTEGER NOT NULL,
    `tags` JSON NOT NULL,
    `time` INTEGER NULL,
    `quizId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Questions` ADD CONSTRAINT `Questions_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
