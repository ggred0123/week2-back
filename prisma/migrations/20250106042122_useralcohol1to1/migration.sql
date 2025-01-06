/*
  Warnings:

  - You are about to drop the `user_preferred_alcohol` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_preferred_alcohol" DROP CONSTRAINT "user_preferred_alcohol_alcohol_id_fkey";

-- DropForeignKey
ALTER TABLE "user_preferred_alcohol" DROP CONSTRAINT "user_preferred_alcohol_user_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "preferred_alcohol_id" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "user_preferred_alcohol";

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_preferred_alcohol_id_fkey" FOREIGN KEY ("preferred_alcohol_id") REFERENCES "alcohol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
