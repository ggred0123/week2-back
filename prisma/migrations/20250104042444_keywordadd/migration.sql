/*
  Warnings:

  - Added the required column `keyword` to the `meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "meeting" ADD COLUMN     "keyword" TEXT NOT NULL;
