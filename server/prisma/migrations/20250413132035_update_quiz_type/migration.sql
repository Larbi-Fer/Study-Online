/*
  Warnings:

  - You are about to alter the column `type` on the `Quizzes` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `Quizzes` MODIFY `type` ENUM('finalQuiz', 'miniQuiz') NOT NULL DEFAULT 'miniQuiz';
