/*
  Warnings:

  - You are about to drop the column `description` on the `community` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `community` table. All the data in the column will be lost.
  - Added the required column `title` to the `community` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `community_content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "community" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "community_content" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "madCampStatus" DROP DEFAULT;
