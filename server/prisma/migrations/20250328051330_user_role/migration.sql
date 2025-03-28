-- AlterTable
ALTER TABLE `User` ADD COLUMN `role` ENUM('admin', 'student') NOT NULL DEFAULT 'student';
