/*
  Warnings:

  - You are about to drop the `coding_field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coding_language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_coding` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `programming_field` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `programming_language` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_coding" DROP CONSTRAINT "user_coding_coding_field_id_fkey";

-- DropForeignKey
ALTER TABLE "user_coding" DROP CONSTRAINT "user_coding_coding_language_id_fkey";

-- DropForeignKey
ALTER TABLE "user_coding" DROP CONSTRAINT "user_coding_user_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "programmingLevel" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "programming_field" TEXT NOT NULL,
ADD COLUMN     "programming_language" TEXT NOT NULL;

-- DropTable
DROP TABLE "coding_field";

-- DropTable
DROP TABLE "coding_language";

-- DropTable
DROP TABLE "user_coding";
