-- CreateTable
CREATE TABLE "processos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "processo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "processos_nome_key" ON "processos"("nome");
