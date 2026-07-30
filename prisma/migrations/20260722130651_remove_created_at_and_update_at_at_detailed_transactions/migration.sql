/*
  Warnings:

  - You are about to drop the column `createdAt` on the `detailedTransactions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `detailedTransactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "detailedTransactions" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
