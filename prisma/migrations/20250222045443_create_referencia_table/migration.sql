-- CreateTable
CREATE TABLE "referencias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "graficoId" INTEGER NOT NULL,
    CONSTRAINT "referencias_graficoId_fkey" FOREIGN KEY ("graficoId") REFERENCES "graficos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
