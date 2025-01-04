/*
  Warnings:

  - You are about to drop the column `max_people` on the `community` table. All the data in the column will be lost.
  - You are about to drop the column `user_id_1` on the `user_matching` table. All the data in the column will be lost.
  - You are about to drop the column `user_id_2` on the `user_matching` table. All the data in the column will be lost.
  - Added the required column `callee_user_id` to the `user_matching` table without a default value. This is not possible if the table is not empty.
  - Added the required column `caller_user_id` to the `user_matching` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment` to the `user_matching` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_matching" DROP CONSTRAINT "user_matching_user_id_1_fkey";

-- DropForeignKey
ALTER TABLE "user_matching" DROP CONSTRAINT "user_matching_user_id_2_fkey";

-- AlterTable
ALTER TABLE "community" DROP COLUMN "max_people";

-- AlterTable
ALTER TABLE "user_matching" DROP COLUMN "user_id_1",
DROP COLUMN "user_id_2",
ADD COLUMN     "callee_user_id" INTEGER NOT NULL,
ADD COLUMN     "caller_user_id" INTEGER NOT NULL,
ADD COLUMN     "comment" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_matching" ADD CONSTRAINT "user_matching_caller_user_id_fkey" FOREIGN KEY ("caller_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_matching" ADD CONSTRAINT "user_matching_callee_user_id_fkey" FOREIGN KEY ("callee_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
