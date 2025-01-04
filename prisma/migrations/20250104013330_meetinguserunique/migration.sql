/*
  Warnings:

  - A unique constraint covering the columns `[meeting_id,user_id]` on the table `meeting_join_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "meeting_join_user_meeting_id_user_id_key" ON "meeting_join_user"("meeting_id", "user_id");
