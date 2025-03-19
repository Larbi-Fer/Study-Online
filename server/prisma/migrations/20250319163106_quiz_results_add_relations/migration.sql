-- AddForeignKey
ALTER TABLE `quiz-results` ADD CONSTRAINT `quiz-results_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz-results` ADD CONSTRAINT `quiz-results_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quizzes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
