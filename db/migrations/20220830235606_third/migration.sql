/*
  Warnings:

  - Added the required column `summary` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDisplayName` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "userDisplayName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "TechnicalCategory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "skills" TEXT[],
    "resumeId" INTEGER NOT NULL,

    CONSTRAINT "TechnicalCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechnicalCategory" ADD CONSTRAINT "TechnicalCategory_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
