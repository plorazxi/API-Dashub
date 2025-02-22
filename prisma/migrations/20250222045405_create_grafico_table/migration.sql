-- CreateTable
CREATE TABLE "graficos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ordem" TEXT NOT NULL,
    "id_dash" INTEGER NOT NULL,
    CONSTRAINT "graficos_id_dash_fkey" FOREIGN KEY ("id_dash") REFERENCES "dashboards" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
