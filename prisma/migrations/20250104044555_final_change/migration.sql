/*
  Warnings:

  - You are about to drop the `community_join_user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `location` to the `meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matching_category_id` to the `user_matching` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "community_join_user" DROP CONSTRAINT "community_join_user_community_id_fkey";

-- DropForeignKey
ALTER TABLE "community_join_user" DROP CONSTRAINT "community_join_user_user_id_fkey";

-- AlterTable
ALTER TABLE "community_content" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "meeting" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_matching" ADD COLUMN     "matching_category_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "community_join_user";

-- CreateTable
CREATE TABLE "matching_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matching_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reply" (
    "id" SERIAL NOT NULL,
    "community_content_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_matching" ADD CONSTRAINT "user_matching_matching_category_id_fkey" FOREIGN KEY ("matching_category_id") REFERENCES "matching_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_community_content_id_fkey" FOREIGN KEY ("community_content_id") REFERENCES "community_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
