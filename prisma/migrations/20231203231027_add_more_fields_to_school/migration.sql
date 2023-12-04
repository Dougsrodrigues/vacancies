/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `schools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `schools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "schools_cnpj_key" ON "schools"("cnpj");
