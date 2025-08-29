/*
  Warnings:

  - The primary key for the `verification` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."verification" DROP CONSTRAINT "verification_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "verification_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "verification_id_seq";
