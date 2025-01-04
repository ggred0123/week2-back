-- CreateTable
CREATE TABLE "community_content" (
    "id" SERIAL NOT NULL,
    "community_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "content_image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "community_content_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "community_content" ADD CONSTRAINT "community_content_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
