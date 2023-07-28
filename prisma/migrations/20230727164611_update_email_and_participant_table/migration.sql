/*
  Warnings:

  - You are about to drop the column `participantAt` on the `participants` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- AlterTable
ALTER TABLE "participants" DROP COLUMN "participantAt";
ALTER TABLE "participants" ADD COLUMN     "makePartAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
