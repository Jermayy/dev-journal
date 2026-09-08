-- AlterTable
ALTER TABLE "Entry" ADD COLUMN     "idempotencyKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Entry_idempotencyKey_key" ON "Entry"("idempotencyKey");
