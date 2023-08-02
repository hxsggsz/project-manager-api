/*
  Warnings:

  - You are about to drop the column `userId` on the `participants` table. All the data in the column will be lost.
  - Added the required column `userId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participants" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "userId" STRING NOT NULL;
