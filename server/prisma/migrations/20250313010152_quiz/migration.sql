/*
  Warnings:

  - The values [miniQuize] on the enum `Quizzes_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Quizzes` MODIFY `type` ENUM('global', 'miniQuiz') NOT NULL;
