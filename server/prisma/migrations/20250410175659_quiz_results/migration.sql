-- AlterTable
ALTER TABLE `quiz-results` ADD COLUMN `lastAttempt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
