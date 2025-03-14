-- CreateTable
CREATE TABLE `quiz-results` (
    `userId` VARCHAR(191) NOT NULL,
    `quizId` VARCHAR(191) NOT NULL,
    `statistics` JSON NOT NULL,
    `percent` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `quizId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
