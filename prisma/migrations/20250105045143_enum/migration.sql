/*
  Warnings:

  - You are about to drop the column `registration_status` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('TEMPORARY', 'COMPLETED');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "registration_status",
ADD COLUMN     "registrationStatus" "RegistrationStatus" NOT NULL DEFAULT 'TEMPORARY';
