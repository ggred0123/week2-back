/*
  Warnings:

  - You are about to drop the column `alcoholLevel` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `leadershipLevel` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `madCampStatus` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `programmingLevel` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "alcoholLevel",
DROP COLUMN "leadershipLevel",
DROP COLUMN "madCampStatus",
DROP COLUMN "programmingLevel",
ADD COLUMN     "alcohol_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "leadership_level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mad_camp_status" "MadCampStatus" NOT NULL DEFAULT 'InCamp',
ADD COLUMN     "programming_level" INTEGER NOT NULL DEFAULT 0;
