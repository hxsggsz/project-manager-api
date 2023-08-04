/*
  Warnings:

  - You are about to drop the column `name` on the `participants` table. All the data in the column will be lost.
  - You are about to drop the column `profilePhoto` on the `participants` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `participants` table. All the data in the column will be lost.
  - Added the required column `userId` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participants" DROP COLUMN "name";
ALTER TABLE "participants" DROP COLUMN "profilePhoto";
ALTER TABLE "participants" DROP COLUMN "username";
ALTER TABLE "participants" ADD COLUMN     "userId" STRING NOT NULL;
