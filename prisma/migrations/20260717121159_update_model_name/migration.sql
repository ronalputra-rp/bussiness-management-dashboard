/*
  Warnings:

  - You are about to drop the `DetailedTransactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DetailedTransactions" DROP CONSTRAINT "DetailedTransactions_productId_fkey";

-- DropForeignKey
ALTER TABLE "DetailedTransactions" DROP CONSTRAINT "DetailedTransactions_transactionId_fkey";

-- DropTable
DROP TABLE "DetailedTransactions";

-- CreateTable
CREATE TABLE "detailedTransactions" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,

    CONSTRAINT "detailedTransactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "detailedTransactions" ADD CONSTRAINT "detailedTransactions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detailedTransactions" ADD CONSTRAINT "detailedTransactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
