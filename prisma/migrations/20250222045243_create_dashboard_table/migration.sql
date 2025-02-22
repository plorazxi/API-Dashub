-- CreateTable
CREATE TABLE "dashboards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,
    CONSTRAINT "dashboards_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
