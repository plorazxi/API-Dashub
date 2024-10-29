-- CreateTable
CREATE TABLE "dashboards" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "dashboards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dashboards" ADD CONSTRAINT "dashboards_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
