-- CreateTable
CREATE TABLE "referencias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "graficoId" INTEGER NOT NULL,

    CONSTRAINT "referencias_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "referencias" ADD CONSTRAINT "referencias_graficoId_fkey" FOREIGN KEY ("graficoId") REFERENCES "graficos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
