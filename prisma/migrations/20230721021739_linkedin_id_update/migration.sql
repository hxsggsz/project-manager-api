/*
  Warnings:

  - You are about to drop the column `linkedinID` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "linkedinID";
ALTER TABLE "user" ADD COLUMN     "linkedinId" STRING;
