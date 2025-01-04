/*
  Warnings:

  - Added the required column `user_id` to the `community_content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "community_content" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "community_content" ADD CONSTRAINT "community_content_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
