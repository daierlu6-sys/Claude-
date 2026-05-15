-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Makeup',
    "subCategory" TEXT,
    "price" REAL NOT NULL,
    "priceMin" REAL,
    "priceMax" REAL,
    "currency" TEXT NOT NULL DEFAULT 'MYR',
    "gmv" REAL,
    "gmvGrowthRate" REAL,
    "salesVolume" INTEGER,
    "salesGrowthRate" REAL,
    "creatorCount" INTEGER,
    "creatorGrowthRate" REAL,
    "videoCount" INTEGER,
    "viewCount" INTEGER,
    "primaryKeyword" TEXT,
    "keywords" TEXT,
    "searchVolume" INTEGER,
    "searchTrend" TEXT,
    "sellerCount" INTEGER,
    "competitionLevel" TEXT,
    "trendScore" REAL NOT NULL DEFAULT 0,
    "trendStatus" TEXT NOT NULL DEFAULT 'unknown',
    "imageUrl" TEXT,
    "productUrl" TEXT,
    "brand" TEXT,
    "description" TEXT,
    "dataDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Product_trendScore_idx" ON "Product"("trendScore");

-- CreateIndex
CREATE INDEX "Product_trendStatus_idx" ON "Product"("trendStatus");
