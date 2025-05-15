/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Notification_id_key` ON `Notification`;

-- CreateIndex
CREATE UNIQUE INDEX `Notification_id_userId_key` ON `Notification`(`id`, `userId`);
