/*
  Warnings:

  - The `mpPrice` column on the `ProductEntity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductEntity" DROP COLUMN "mpPrice",
ADD COLUMN     "mpPrice" INTEGER;
