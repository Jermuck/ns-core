-- CreateTable
CREATE TABLE "ProductEntity" (
    "id" TEXT NOT NULL,
    "itemNumber" TEXT,
    "country" TEXT,
    "brand" TEXT,
    "productLine" TEXT,
    "name" TEXT,
    "type" TEXT,
    "color" TEXT,
    "description" TEXT,
    "ingredients" TEXT,
    "size" INTEGER,
    "measure" TEXT,
    "price" INTEGER,
    "retailPrice" INTEGER,
    "sale" TEXT,
    "availableQuantity" INTEGER,
    "additionalInformation" TEXT,
    "photos" TEXT[],
    "supplier" TEXT,
    "model" TEXT,
    "oldPrice" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "mpPrice" TEXT NOT NULL,
    "tax" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductEntity_id_key" ON "ProductEntity"("id");
