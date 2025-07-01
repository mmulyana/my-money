-- CreateTable
CREATE TABLE "TotalWallet" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "TotalWallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TotalWallet" ADD CONSTRAINT "TotalWallet_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
