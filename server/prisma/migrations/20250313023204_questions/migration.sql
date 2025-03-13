/*
  Warnings:

  - You are about to drop the column `Choices` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `choices` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Questions` DROP COLUMN `Choices`,
    ADD COLUMN `choices` JSON NOT NULL;
