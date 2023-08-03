-- CreateTable
CREATE TABLE "LogEntity" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "timeCreate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "LogEntity_id_key" ON "LogEntity"("id");
