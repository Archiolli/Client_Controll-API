-- CreateTable
CREATE TABLE "processos" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "processos_nome_key" ON "processos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
