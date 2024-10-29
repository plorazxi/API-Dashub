-- CreateTable
CREATE TABLE "graficos" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ordem" TEXT NOT NULL,
    "id_dash" INTEGER NOT NULL,

    CONSTRAINT "graficos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "graficos" ADD CONSTRAINT "graficos_id_dash_fkey" FOREIGN KEY ("id_dash") REFERENCES "dashboards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
