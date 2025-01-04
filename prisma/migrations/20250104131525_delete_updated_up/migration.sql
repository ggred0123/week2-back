/*
  Warnings:

  - You are about to drop the column `updated_at` on the `alcohol` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `coding_field` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `coding_language` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `community` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `community_content` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `matching_category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `mbti` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `meeting` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `reply` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `university` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_coding` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_matching` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_preferred_alcohol` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "alcohol" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "coding_field" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "coding_language" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "community" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "community_content" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "matching_category" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "mbti" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "meeting" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "reply" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "university" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "user_coding" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "user_matching" DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "user_preferred_alcohol" DROP COLUMN "updated_at";
