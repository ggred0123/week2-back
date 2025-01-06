/*
  Warnings:

  - You are about to drop the column `registrationStatus` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "registrationStatus",
ADD COLUMN     "registration_status" "RegistrationStatus" NOT NULL DEFAULT 'TEMPORARY';
